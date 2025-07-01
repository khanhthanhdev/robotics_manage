# Tournament Management Page Optimization Plan

## Overview
This document outlines the implementation plan for creating an optimized `/tournaments/[id]` page for comprehensive tournament management with performance optimizations to reduce server workload and improve user experience.

## 1. Current State Analysis

### Existing Architecture
- **Backend**: NestJS with Prisma ORM
- **Database**: PostgreSQL with comprehensive tournament/match/field schema
- **Frontend**: Next.js with React Query for data fetching
- **Current Issues**:
  - Multiple API calls for related data
  - No field-referee assignment system
  - Limited tournament management interface
  - Potential N+1 query problems

### Performance Bottlenecks Identified
- Separate API calls for tournament, stages, fields, and referees
- No caching strategy for frequently accessed data
- Inefficient database queries with multiple includes
- No optimistic updates for user interactions

## 2. Database Schema Enhancements

### New Tables Required

```prisma
model FieldReferee {
  id        String   @id @default(uuid())
  fieldId   String
  userId    String
  isHeadRef Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  field Field @relation(fields: [fieldId], references: [id], onDelete: Cascade)
  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([fieldId, userId])
  @@map("field_referees")
  @@index([fieldId])
  @@index([userId])
}
```

### Schema Updates
```prisma
model Field {
  // ...existing fields...
  fieldReferees FieldReferee[]
}

model User {
  // ...existing fields...
  fieldReferees FieldReferee[]
}
```

## 3. Backend API Optimization

### 3.1 Consolidated Tournament Details Endpoint

**Current Problem**: Multiple API calls for tournament data
**Solution**: Single comprehensive endpoint

```typescript
// tournaments.service.ts
async findOneWithFullDetails(id: string) {
  return this.prisma.tournament.findUnique({
    where: { id },
    include: {
      admin: { 
        select: { id: true, username: true, email: true } 
      },
      stages: {
        include: {
          _count: { 
            select: { 
              matches: true,
              matches: { where: { status: 'COMPLETED' } }
            } 
          }
        },
        orderBy: { startDate: 'asc' }
      },
      fields: {
        include: {
          fieldReferees: {
            include: {
              user: { 
                select: { 
                  id: true, 
                  username: true, 
                  email: true,
                  role: true 
                } 
              }
            }
          },
          _count: { 
            select: { 
              matches: true,
              matches: { where: { status: { in: ['SCHEDULED', 'IN_PROGRESS'] } } }
            } 
          }
        },
        orderBy: { name: 'asc' }
      },
      _count: {
        select: {
          stages: true,
          fields: true,
          teams: true
        }
      }
    }
  });
}
```

### 3.2 Field-Referee Management Service

```typescript
// field-referee.service.ts
@Injectable()
export class FieldRefereeService {
  constructor(private prisma: PrismaService) {}

  async assignRefereesToField(fieldId: string, assignments: RefereeAssignment[]) {
    // Validate: exactly one head referee
    const headRefCount = assignments.filter(a => a.isHeadRef).length;
    if (headRefCount !== 1) {
      throw new BadRequestException('Exactly one head referee must be assigned');
    }

    // Validate: 3-4 referees total
    if (assignments.length < 3 || assignments.length > 4) {
      throw new BadRequestException('Must assign 3-4 referees per field');
    }

    return this.prisma.$transaction(async (tx) => {
      // Clear existing assignments
      await tx.fieldReferee.deleteMany({ where: { fieldId } });
      
      // Create new assignments
      await tx.fieldReferee.createMany({
        data: assignments.map(a => ({
          fieldId,
          userId: a.userId,
          isHeadRef: a.isHeadRef
        }))
      });

      // Auto-assign head referee to existing matches
      const headReferee = assignments.find(a => a.isHeadRef);
      if (headReferee) {
        await tx.match.updateMany({
          where: { fieldId, scoredById: null },
          data: { scoredById: headReferee.userId }
        });
      }

      return this.getFieldReferees(fieldId);
    });
  }

  async batchAssignReferees(assignments: BatchRefereeAssignment[]) {
    return this.prisma.$transaction(
      assignments.map(assignment => 
        this.prisma.fieldReferee.upsert({
          where: {
            fieldId_userId: {
              fieldId: assignment.fieldId,
              userId: assignment.userId
            }
          },
          update: { isHeadRef: assignment.isHeadRef },
          create: {
            fieldId: assignment.fieldId,
            userId: assignment.userId,
            isHeadRef: assignment.isHeadRef
          }
        })
      )
    );
  }
}
```

### 3.3 Enhanced Tournament Controller

```typescript
// tournaments.controller.ts
@Controller('tournaments')
export class TournamentsController {
  // ...existing methods...

  @Get(':id/details')
  async getTournamentDetails(@Param('id') id: string) {
    return this.tournamentsService.findOneWithFullDetails(id);
  }

  @Post(':id/fields/:fieldId/referees')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async assignFieldReferees(
    @Param('fieldId') fieldId: string,
    @Body() assignmentDto: AssignRefereesDto
  ) {
    return this.fieldRefereeService.assignRefereesToField(fieldId, assignmentDto.referees);
  }

  @Post(':id/referees/batch')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async batchAssignReferees(@Body() batchDto: BatchAssignRefereesDto) {
    return this.fieldRefereeService.batchAssignReferees(batchDto.assignments);
  }
}
```

## 4. Frontend Architecture

### 4.1 File Structure

```
frontend/src/app/tournaments/[id]/
├── page.tsx                     # Main tournament management page
├── components/
│   ├── tournament-header.tsx    # Tournament info header
│   ├── tournament-overview.tsx  # Overview tab content
│   ├── stages-section.tsx       # Stages management
│   ├── fields-section.tsx       # Fields and referee management
│   ├── field-card.tsx          # Individual field card
│   ├── field-referee-dialog.tsx # Referee assignment dialog
│   ├── tournament-edit-form.tsx # Inline edit form
│   └── stage-quick-create.tsx   # Quick stage creation
├── hooks/
│   ├── use-tournament-management.ts # Main data hook
│   ├── use-tournament-mutations.ts  # Mutation hooks
│   └── use-field-referees.ts       # Field referee hooks
└── types/
    ├── tournament.types.ts      # TypeScript types
    └── referee.types.ts         # Referee assignment types
```

### 4.2 Performance-Optimized Data Fetching

```typescript
// hooks/use-tournament-management.ts
export function useTournamentManagement(tournamentId: string) {
  const [isActive, setIsActive] = useState(document.hasFocus());
  
  // Smart focus tracking
  useEffect(() => {
    const handleFocus = () => setIsActive(true);
    const handleBlur = () => setIsActive(false);
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Single comprehensive query
  const tournamentQuery = useQuery({
    queryKey: ['tournament-management', tournamentId],
    queryFn: () => TournamentService.getFullDetails(tournamentId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: isActive ? 30000 : false, // Poll only when active
    refetchOnWindowFocus: true,
    enabled: !!tournamentId
  });

  // Derived data (no additional API calls)
  const tournament = tournamentQuery.data;
  const stages = tournament?.stages || [];
  const fields = tournament?.fields || [];
  
  // Client-side computed stats
  const stats = useMemo(() => ({
    totalStages: stages.length,
    activeStages: stages.filter(s => s.status === 'ACTIVE').length,
    completedStages: stages.filter(s => s.status === 'COMPLETED').length,
    totalFields: fields.length,
    fieldsWithReferees: fields.filter(f => f.fieldReferees.length > 0).length,
    fieldsWithHeadReferee: fields.filter(f => f.fieldReferees.some(fr => fr.isHeadRef)).length,
    totalReferees: [...new Set(fields.flatMap(f => f.fieldReferees.map(fr => fr.userId)))].length,
    averageRefereesPerField: fields.length > 0 ? 
      fields.reduce((sum, f) => sum + f.fieldReferees.length, 0) / fields.length : 0
  }), [stages, fields]);

  return {
    tournament,
    stages,
    fields,
    stats,
    isLoading: tournamentQuery.isLoading,
    error: tournamentQuery.error,
    refetch: tournamentQuery.refetch
  };
}
```

### 4.3 Optimistic Updates

```typescript
// hooks/use-tournament-mutations.ts
export function useUpdateTournament(tournamentId: string) {
  const queryClient = useQueryClient();
  const queryKey = ['tournament-management', tournamentId];

  return useMutation({
    mutationFn: (data: UpdateTournamentDto) => 
      TournamentService.update(tournamentId, data),
    
    // Optimistic update
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      
      queryClient.setQueryData(queryKey, (old: any) => ({
        ...old,
        ...newData,
        startDate: newData.startDate ? new Date(newData.startDate) : old.startDate,
        endDate: newData.endDate ? new Date(newData.endDate) : old.endDate
      }));

      return { previousData };
    },
    
    onError: (err, newData, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
}

export function useAssignFieldReferees(fieldId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignments: RefereeAssignment[]) => 
      FieldService.assignReferees(fieldId, assignments),
    
    onMutate: async (newAssignments) => {
      // Optimistic update for field referees
      const queryKey = ['tournament-management'];
      
      queryClient.setQueriesData(
        { queryKey, exact: false },
        (old: any) => {
          if (!old?.fields) return old;
          
          return {
            ...old,
            fields: old.fields.map((field: any) => 
              field.id === fieldId 
                ? { ...field, fieldReferees: newAssignments }
                : field
            )
          };
        }
      );
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        predicate: (query) => 
          query.queryKey[0] === 'tournament-management' ||
          query.queryKey[0] === 'field-referees'
      });
    }
  });
}
```

### 4.4 Lazy Loading Strategy

```typescript
// page.tsx
export default function TournamentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'stages' | 'fields'>('overview');
  
  // Base tournament data (always loaded)
  const { tournament, stages, fields, stats, isLoading } = useTournamentManagement(params.id);
  
  // Conditional detailed loading
  const shouldLoadStageDetails = activeTab === 'stages';
  const shouldLoadFieldDetails = activeTab === 'fields';
  
  // Only load detailed data when needed
  const { data: detailedStages } = useQuery({
    queryKey: ['tournament-stages-detailed', params.id],
    queryFn: () => StageService.getDetailedByTournament(params.id),
    enabled: shouldLoadStageDetails && !!tournament,
    staleTime: 2 * 60 * 1000 // 2 minutes
  });

  const { data: availableReferees } = useQuery({
    queryKey: ['available-referees', params.id],
    queryFn: () => UserService.getAvailableReferees(),
    enabled: shouldLoadFieldDetails && !!tournament,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  if (isLoading) {
    return <TournamentSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TournamentHeader tournament={tournament} />
      
      <div className="container mx-auto px-4 py-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'overview' && (
          <TournamentOverview 
            tournament={tournament} 
            stats={stats}
          />
        )}
        
        {activeTab === 'stages' && (
          <StagesSection 
            tournamentId={params.id}
            stages={stages}
            detailedStages={detailedStages}
          />
        )}
        
        {activeTab === 'fields' && (
          <FieldsSection 
            tournamentId={params.id}
            fields={fields}
            availableReferees={availableReferees}
          />
        )}
      </div>
    </div>
  );
}
```

## 5. Key Components Implementation

### 5.1 Tournament Overview

```typescript
// components/tournament-overview.tsx
export function TournamentOverview({ tournament, stats }: TournamentOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateTournament = useUpdateTournament(tournament.id);
  
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Stages" 
          value={stats.totalStages}
          subtitle={`${stats.activeStages} active, ${stats.completedStages} completed`}
          icon={<Trophy className="h-5 w-5" />}
        />
        <StatCard 
          title="Fields" 
          value={stats.totalFields}
          subtitle={`${stats.fieldsWithHeadReferee} with head referee`}
          icon={<MapPin className="h-5 w-5" />}
        />
        <StatCard 
          title="Referees" 
          value={stats.totalReferees}
          subtitle={`${stats.averageRefereesPerField.toFixed(1)} avg per field`}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard 
          title="Teams" 
          value={tournament._count?.teams || 0}
          subtitle="Registered teams"
          icon={<Shield className="h-5 w-5" />}
        />
      </div>
      
      {/* Tournament Details */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tournament Details</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              disabled={updateTournament.isLoading}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <TournamentEditForm 
              tournament={tournament}
              onSave={() => setIsEditing(false)}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <TournamentDetails tournament={tournament} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

### 5.2 Fields Section with Referee Management

```typescript
// components/fields-section.tsx
export function FieldsSection({ tournamentId, fields, availableReferees }: FieldsSectionProps) {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  
  const batchAssignReferees = useBatchAssignReferees();
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tournament Fields</h2>
          <p className="text-gray-600 mt-1">
            Manage fields and assign referees (3-4 referees per field, 1 head referee)
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowBulkAssign(true)}
            disabled={!availableReferees?.length}
          >
            <Users className="h-4 w-4 mr-2" />
            Bulk Assign
          </Button>
          <Button onClick={() => setShowAddField(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>
      </div>
      
      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map(field => (
          <FieldCard 
            key={field.id} 
            field={field} 
            onAssignReferees={() => setSelectedField(field)}
            availableReferees={availableReferees}
          />
        ))}
      </div>
      
      {/* Dialogs */}
      {selectedField && (
        <FieldRefereeDialog
          field={selectedField}
          availableReferees={availableReferees}
          onClose={() => setSelectedField(null)}
        />
      )}
      
      {showBulkAssign && (
        <BulkRefereeAssignDialog
          fields={fields}
          availableReferees={availableReferees}
          onClose={() => setShowBulkAssign(false)}
        />
      )}
    </div>
  );
}
```

### 5.3 Field Card Component

```typescript
// components/field-card.tsx
export function FieldCard({ field, onAssignReferees, availableReferees }: FieldCardProps) {
  const headReferee = field.fieldReferees?.find(fr => fr.isHeadRef);
  const assistantReferees = field.fieldReferees?.filter(fr => !fr.isHeadRef) || [];
  
  const refereeCount = field.fieldReferees?.length || 0;
  const isFullyStaffed = refereeCount >= 3 && refereeCount <= 4 && headReferee;
  
  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      isFullyStaffed ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{field.name}</CardTitle>
            <p className="text-sm text-gray-600">Field {field.number}</p>
          </div>
          <Badge 
            variant={isFullyStaffed ? "default" : "secondary"}
            className={isFullyStaffed ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
          >
            {refereeCount}/4 Referees
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Head Referee */}
        <div>
          <Label className="text-sm font-medium text-gray-700">Head Referee</Label>
          {headReferee ? (
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                {headReferee.user.username}
              </Badge>
              <Crown size={14} className="text-yellow-500" />
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Not assigned</p>
          )}
        </div>
        
        {/* Assistant Referees */}
        <div>
          <Label className="text-sm font-medium text-gray-700">
            Assistant Referees ({assistantReferees.length})
          </Label>
          {assistantReferees.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {assistantReferees.map(ref => (
                <Badge key={ref.id} variant="outline" className="text-xs">
                  {ref.user.username}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1">None assigned</p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onAssignReferees}
            className="flex-1"
          >
            <Settings className="h-3 w-3 mr-1" />
            Manage
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => {/* View matches */}}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## 6. Performance Optimizations Summary

### 6.1 API Call Reduction
- **Before**: 5-6 separate API calls for tournament data
- **After**: 1 comprehensive API call
- **Reduction**: ~85% fewer API calls

### 6.2 Caching Strategy
- **Stale Time**: 5 minutes for tournament data
- **Cache Time**: 10 minutes for inactive queries
- **Smart Polling**: Only poll when tab is active (30s intervals)
- **Optimistic Updates**: Immediate UI updates for mutations

### 6.3 Database Optimization
- **Selective Includes**: Only fetch needed relations
- **Composite Indexes**: Optimized for common query patterns
- **Batch Operations**: Single transaction for multiple referee assignments
- **Computed Stats**: Client-side calculation to reduce server load

### 6.4 Frontend Optimizations
- **Lazy Loading**: Detailed data only when tabs are active
- **Memoization**: Computed stats cached with useMemo
- **Conditional Rendering**: Components only render when needed
- **Smart Polling**: Pause polling when user is away

## 7. Implementation Timeline

### Phase 1: Backend Foundation (Week 1)
- [ ] Add FieldReferee model and migration
- [ ] Implement FieldRefereeService
- [ ] Create consolidated tournament details endpoint
- [ ] Add batch referee assignment endpoint

### Phase 2: Frontend Structure (Week 2)
- [ ] Create tournament detail page structure
- [ ] Implement performance-optimized hooks
- [ ] Build tournament overview component
- [ ] Create field management components

### Phase 3: Referee Management (Week 3)
- [ ] Implement field-referee assignment dialogs
- [ ] Add bulk assignment functionality
- [ ] Create referee availability system
- [ ] Implement auto-assignment logic

### Phase 4: Optimization & Polish (Week 4)
- [ ] Add optimistic updates
- [ ] Implement smart caching
- [ ] Performance testing and tuning
- [ ] UI/UX improvements

## 8. Testing Strategy

### 8.1 Performance Testing
- Load testing with 100+ concurrent users
- Database query performance monitoring
- Frontend bundle size optimization
- Memory leak detection

### 8.2 Functional Testing
- Referee assignment validation (3-4 per field, 1 head)
- Tournament CRUD operations
- Auto-assignment of head referee to matches
- Batch operations integrity

### 8.3 User Experience Testing
- Tab switching performance
- Optimistic update feedback
- Error handling and recovery
- Mobile responsiveness

## 9. Success Metrics

### Performance Targets
- **Page Load Time**: < 2 seconds
- **API Response Time**: < 500ms
- **Cache Hit Rate**: > 80%
- **Database Query Time**: < 100ms average

### User Experience Targets
- **Task Completion Rate**: > 95%
- **Error Rate**: < 2%
- **User Satisfaction**: > 4.5/5

This comprehensive plan ensures a robust, performant tournament management system that significantly reduces server load while providing an excellent user experience.
