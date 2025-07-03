# User Management System Plan
## Robotics Tournament Management System

**Version:** 1.0  
**Date:** July 2, 2025  
**Author:** Development Team

---

## Table of Contents
1. [Overview](#overview)
2. [User Roles & Permissions](#user-roles--permissions)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [Security Considerations](#security-considerations)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [UI/UX Design](#uiux-design)
9. [Implementation Timeline](#implementation-timeline)
10. [Testing Strategy](#testing-strategy)

---

## Overview

The User Management System provides comprehensive CRUD operations for administrators to manage users across different roles in the robotics tournament management system. The system ensures proper role-based access control and maintains audit trails for user actions.

### Key Features
- Role-based user management
- User creation, editing, and deletion
- Role assignment and modification
- User search and filtering
- User statistics dashboard
- Audit trail for user actions
- Bulk operations support

---

## User Roles & Permissions

### Role Hierarchy
```
ADMIN
├── HEAD_REFEREE
├── ALLIANCE_REFEREE
├── TEAM_LEADER
├── TEAM_MEMBER
└── COMMON
```

### Role Definitions

| Role | Description | Permissions |
|------|-------------|-------------|
| **ADMIN** | System administrator | Full system access, user management |
| **HEAD_REFEREE** | Senior referee | Match management, referee coordination |
| **ALLIANCE_REFEREE** | Field referee | Score entry, match officiating |
| **TEAM_LEADER** | Team captain/coach | Team management, registration |
| **TEAM_MEMBER** | Team participant | Limited team access |
| **COMMON** | General user | Basic tournament viewing |

### Permission Matrix

| Action | ADMIN | HEAD_REFEREE | ALLIANCE_REFEREE | TEAM_LEADER | TEAM_MEMBER | COMMON |
|--------|-------|--------------|------------------|-------------|-------------|--------|
| Create User | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| View Users | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Edit User | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Delete User | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Change Role | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| View Profile | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Backend Implementation

### 1. Enhanced User Service

#### File: `src/users/users.service.ts`

**New Methods to Implement:**
```typescript
// Pagination and filtering
async findAll(page: number, limit: number, role?: UserRole, search?: string)

// User statistics
async getUserStats(): Promise<Record<UserRole, number>>

// Role management
async changeRole(id: string, newRole: UserRole)

// Bulk operations
async bulkDelete(ids: string[])
async bulkChangeRole(ids: string[], newRole: UserRole)

// User search
async searchUsers(query: string): Promise<User[]>

// Audit trail
async getUserAuditLog(id: string): Promise<AuditLog[]>
```

#### Enhanced Features:
- **Pagination**: Support for large user lists
- **Filtering**: By role, creation date, status
- **Search**: By username, email, phone
- **Validation**: Email uniqueness, username constraints
- **Error Handling**: Custom exceptions for user operations
- **Audit Logging**: Track all user modifications

### 2. Enhanced User Controller

#### File: `src/users/users.controller.ts`

**New Endpoints:**
```typescript
@Get('stats')           // GET /users/stats
@Get('search')          // GET /users/search?q=query
@Patch(':id/role')      // PATCH /users/:id/role
@Post('bulk-delete')    // POST /users/bulk-delete
@Post('bulk-role')      // POST /users/bulk-role
@Get(':id/audit')       // GET /users/:id/audit
@Post('export')         // POST /users/export
@Post('import')         // POST /users/import
```

### 3. Enhanced DTOs

#### File: `src/users/dto/create-user.dto.ts`
```typescript
export const CreateUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
  email: z.string().email().optional(),
  role: z.nativeEnum(UserRole),
  phoneNumber: z.string().optional(),
  gender: z.boolean().optional(),
  dateOfBirth: z.date().optional(),
  createdById: z.string().uuid().optional(),
});
```

#### File: `src/users/dto/update-user.dto.ts`
```typescript
export const UpdateUserSchema = CreateUserSchema.partial();

export const ChangeRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
  reason: z.string().optional(),
});

export const BulkOperationSchema = z.object({
  userIds: z.array(z.string().uuid()),
  action: z.enum(['delete', 'changeRole']),
  role: z.nativeEnum(UserRole).optional(),
});
```

### 4. Middleware & Guards

#### File: `src/users/guards/user-operation.guard.ts`
```typescript
@Injectable()
export class UserOperationGuard implements CanActivate {
  // Prevent admins from deleting themselves
  // Prevent deletion of last admin
  // Validate role change permissions
}
```

### 5. Audit Logging

#### File: `src/audit/audit.service.ts`
```typescript
@Injectable()
export class AuditService {
  async logUserAction(
    userId: string,
    action: string,
    targetUserId?: string,
    details?: any
  ) {
    // Log user operations for compliance
  }
}
```

---

## Frontend Implementation

### 1. User Management Dashboard

#### File: `src/components/admin/UserManagement.tsx`

**Key Components:**
- **UserTable**: Sortable, filterable user list
- **UserForm**: Create/edit user modal
- **RoleChangeModal**: Quick role assignment
- **BulkActions**: Multi-select operations
- **UserStats**: Role distribution charts
- **SearchBar**: Real-time user search
- **ExportImport**: CSV/Excel operations

### 2. Component Structure

```
src/components/admin/
├── UserManagement.tsx           # Main dashboard
├── UserTable.tsx               # User list table
├── UserForm.tsx                # Create/edit form
├── UserStats.tsx               # Statistics cards
├── RoleManagement.tsx          # Role assignment
├── BulkActions.tsx             # Bulk operations
├── UserSearch.tsx              # Search component
├── UserProfile.tsx             # User detail view
└── UserAudit.tsx               # Audit log viewer
```

### 3. State Management

#### File: `src/store/userSlice.ts`
```typescript
interface UserState {
  users: User[];
  totalUsers: number;
  currentPage: number;
  pageSize: number;
  filters: UserFilters;
  loading: boolean;
  selectedUsers: string[];
  stats: UserStats;
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers,
    setFilters,
    setSelectedUsers,
    updateUserRole,
    removeUsers,
    // ... other actions
  },
});
```

### 4. Custom Hooks

```typescript
// useUserManagement.ts
export const useUserManagement = () => {
  // User CRUD operations
  // Pagination logic
  // Filter management
  // Bulk operations
};

// useUserStats.ts
export const useUserStats = () => {
  // Statistics calculations
  // Chart data preparation
};
```

### 5. UI Components

#### Dashboard Layout
```typescript
const UserManagementDashboard = () => (
  <div className="user-management">
    <Header>
      <Title>User Management</Title>
      <Actions>
        <CreateUserButton />
        <ExportUsersButton />
      </Actions>
    </Header>
    
    <StatsSection>
      <UserRoleStats />
      <UserGrowthChart />
    </StatsSection>
    
    <FiltersSection>
      <SearchBar />
      <RoleFilter />
      <DateRangeFilter />
    </FiltersSection>
    
    <TableSection>
      <BulkActions />
      <UserTable />
      <Pagination />
    </TableSection>
  </div>
);
```

---

## Security Considerations

### 1. Authentication & Authorization
- JWT token validation
- Role-based access control
- Session management
- Password complexity requirements

### 2. Data Protection
- Password hashing (bcrypt)
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### 3. Audit & Compliance
- User action logging
- Data retention policies
- GDPR compliance considerations
- Access log monitoring

### 4. Rate Limiting
```typescript
@UseGuards(ThrottlerGuard)
@Throttle(10, 60) // 10 requests per minute
export class UsersController {
  // ... controller methods
}
```

---

## Database Schema

### Current User Model Enhancement

```prisma
model User {
  id              String           @id @default(uuid())
  username        String           @unique
  password        String
  role            UserRole
  email           String?          @unique
  gender          Boolean?
  dateOfBirth     DateTime?
  phoneNumber     String?
  avatar          String?          // New: Profile picture URL
  isActive        Boolean          @default(true) // New: Account status
  lastLoginAt     DateTime?        // New: Track last login
  passwordResetToken String?       // New: Password reset
  passwordResetExpires DateTime?   // New: Reset token expiry
  emailVerified   Boolean          @default(false) // New: Email verification
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  createdBy       User?            @relation("CreatedUsers", fields: [createdById], references: [id])
  createdById     String?
  createdUsers    User[]           @relation("CreatedUsers")
  
  // Existing relations...
  tournaments     Tournament[]
  scoredMatches   Match[]          @relation("ScoredBy")
  matchReferees   MatchReferee[]
  fieldDisplays   FieldDisplay[]
  fieldReferees   FieldReferee[]
  
  // New relations
  auditLogs       AuditLog[]       @relation("AuditUser")
  createdAuditLogs AuditLog[]      @relation("AuditCreatedBy")

  @@index([createdById])
  @@index([role])
  @@index([isActive])
  @@index([email])
}

// New: Audit logging model
model AuditLog {
  id          String    @id @default(uuid())
  userId      String?   // User being acted upon
  user        User?     @relation("AuditUser", fields: [userId], references: [id])
  createdById String    // User performing the action
  createdBy   User      @relation("AuditCreatedBy", fields: [createdById], references: [id])
  action      String    // CREATE, UPDATE, DELETE, ROLE_CHANGE
  tableName   String    // users, tournaments, etc.
  recordId    String?   // ID of the affected record
  oldValues   Json?     // Previous values
  newValues   Json?     // New values
  ipAddress   String?   // Client IP
  userAgent   String?   // Client browser info
  createdAt   DateTime  @default(now())

  @@index([userId])
  @@index([createdById])
  @@index([action])
  @@index([createdAt])
}
```

---

## API Endpoints

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | List users with pagination | ADMIN, HEAD_REFEREE |
| GET | `/users/stats` | User statistics | ADMIN |
| GET | `/users/search` | Search users | ADMIN, HEAD_REFEREE |
| GET | `/users/:id` | Get user details | ADMIN, HEAD_REFEREE |
| POST | `/users` | Create new user | ADMIN |
| PATCH | `/users/:id` | Update user | ADMIN |
| PATCH | `/users/:id/role` | Change user role | ADMIN |
| DELETE | `/users/:id` | Delete user | ADMIN |
| POST | `/users/bulk-delete` | Bulk delete users | ADMIN |
| POST | `/users/bulk-role` | Bulk change roles | ADMIN |
| GET | `/users/:id/audit` | Get user audit log | ADMIN |
| POST | `/users/export` | Export users to CSV | ADMIN |
| POST | `/users/import` | Import users from CSV | ADMIN |

### Request/Response Examples

#### Create User
```json
POST /users
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "TEAM_LEADER",
  "phoneNumber": "+1-555-0123"
}

Response:
{
  "id": "uuid",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "TEAM_LEADER",
  "createdAt": "2025-07-02T10:00:00Z",
  "createdBy": {
    "id": "admin-uuid",
    "username": "admin"
  }
}
```

#### Get Users with Filters
```json
GET /users?page=1&limit=10&role=TEAM_LEADER&search=john

Response:
{
  "users": [...],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

---

## UI/UX Design

### 1. Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ User Management Dashboard                    [+ Create]  │
├─────────────────────────────────────────────────────────┤
│ [📊 Stats Cards: Admin: 2, Head Ref: 5, etc.]          │
├─────────────────────────────────────────────────────────┤
│ [🔍 Search] [Filter: Role ▼] [Filter: Status ▼] [Export]│
├─────────────────────────────────────────────────────────┤
│ □ Select All | [🗑️ Delete] [👤 Change Role]            │
├─────────────────────────────────────────────────────────┤
│ Username     | Email           | Role        | Actions   │
│ ──────────────────────────────────────────────────────  │
│ □ admin      | admin@test.com  | ADMIN      | [✏️][🗑️] │
│ □ ref_john   | john@ref.com    | HEAD_REF   | [✏️][🗑️] │
│ □ team_lead1 | leader@team.com | TEAM_LEAD  | [✏️][🗑️] │
├─────────────────────────────────────────────────────────┤
│                              [1] [2] [3] ... [Next >]   │
└─────────────────────────────────────────────────────────┘
```

### 2. Color Scheme & Icons

```scss
// Role Colors
$admin-color: #ff4d4f;      // Red
$head-ref-color: #fa8c16;   // Orange  
$alliance-ref-color: #1890ff; // Blue
$team-leader-color: #52c41a;  // Green
$team-member-color: #13c2c2;  // Cyan
$common-color: #8c8c8c;       // Gray

// Status Colors
$active-color: #52c41a;    // Green
$inactive-color: #ff4d4f;  // Red
$pending-color: #faad14;   // Yellow
```

### 3. Responsive Design

- **Desktop**: Full dashboard with all features
- **Tablet**: Simplified table, collapsible filters
- **Mobile**: Card-based layout, drawer navigation

### 4. Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus indicators

---

## Implementation Timeline

### Phase 1: Backend Foundation (Week 1-2)
- [ ] Enhance User service with pagination and filtering
- [ ] Create audit logging system
- [ ] Add new API endpoints
- [ ] Implement enhanced DTOs and validation
- [ ] Add security guards and middleware
- [ ] Write unit tests for services

### Phase 2: Frontend Core (Week 3-4)
- [ ] Create user management dashboard
- [ ] Implement user table with sorting/filtering
- [ ] Add create/edit user forms
- [ ] Implement role management
- [ ] Add search functionality
- [ ] Create user statistics display

### Phase 3: Advanced Features (Week 5-6)
- [ ] Add bulk operations
- [ ] Implement export/import functionality
- [ ] Create audit log viewer
- [ ] Add user profile management
- [ ] Implement real-time notifications
- [ ] Add advanced filtering options

### Phase 4: Testing & Polish (Week 7-8)
- [ ] Integration testing
- [ ] E2E testing with Cypress
- [ ] Performance optimization
- [ ] Security audit
- [ ] UI/UX refinements
- [ ] Documentation updates

---

## Testing Strategy

### 1. Backend Testing

#### Unit Tests
```typescript
// users.service.spec.ts
describe('UsersService', () => {
  describe('findAll', () => {
    it('should return paginated users');
    it('should filter by role');
    it('should search by username');
  });
  
  describe('changeRole', () => {
    it('should update user role');
    it('should prevent invalid role changes');
  });
  
  describe('remove', () => {
    it('should delete user');
    it('should prevent deleting last admin');
  });
});
```

#### Integration Tests
```typescript
// users.controller.spec.ts
describe('UsersController', () => {
  it('GET /users should return user list');
  it('POST /users should create user');
  it('PATCH /users/:id/role should change role');
  it('should enforce admin-only access');
});
```

### 2. Frontend Testing

#### Component Tests
```typescript
// UserManagement.test.tsx
describe('UserManagement', () => {
  it('renders user table');
  it('opens create user modal');
  it('filters users by role');
  it('performs bulk delete');
});
```

#### E2E Tests
```typescript
// cypress/integration/user-management.spec.ts
describe('User Management', () => {
  it('admin can create new user');
  it('admin can change user role');
  it('admin can delete user');
  it('prevents non-admin access');
});
```

### 3. Performance Testing
- Load testing with multiple concurrent users
- Database query optimization
- Frontend rendering performance
- API response time monitoring

---

## Deployment Considerations

### 1. Environment Variables
```bash
# Backend
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
BCRYPT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Frontend
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=production
```

### 2. Database Migrations
```bash
# Generate migration for new audit log table
npx prisma migrate dev --name add-audit-log

# Generate migration for user model enhancements  
npx prisma migrate dev --name enhance-user-model
```

### 3. Docker Configuration
```dockerfile
# Backend Dockerfile updates
COPY prisma ./prisma/
RUN npx prisma generate
RUN npx prisma migrate deploy
```

---

## Monitoring & Analytics

### 1. Metrics to Track
- User creation/deletion rates
- Role distribution changes
- Login frequency by role
- Failed authentication attempts
- API endpoint usage

### 2. Logging Strategy
```typescript
// Enhanced logging
logger.info('User created', {
  userId: newUser.id,
  role: newUser.role,
  createdBy: currentUser.id,
  timestamp: new Date().toISOString()
});
```

### 3. Health Checks
- Database connectivity
- Authentication service status
- API response times
- Memory usage monitoring

---

## Future Enhancements

### 1. Advanced Features
- **Single Sign-On (SSO)**: LDAP/OAuth integration
- **Multi-factor Authentication**: SMS/Email verification
- **Advanced Permissions**: Granular permission system
- **User Groups**: Organize users into groups
- **Automated Role Assignment**: Based on criteria

### 2. Integration Possibilities
- **Email Notifications**: User creation/role changes
- **Slack Integration**: Admin notifications
- **Mobile App**: User management on mobile
- **API Keys**: For external integrations
- **Webhook Support**: External system notifications

### 3. Analytics Dashboard
- User engagement metrics
- Role effectiveness analysis
- System usage patterns
- Security incident tracking

---

## Conclusion

This comprehensive user management system provides a robust foundation for managing users across all roles in the robotics tournament management system. The implementation focuses on security, scalability, and user experience while maintaining flexibility for future enhancements.

The phased approach ensures steady progress while allowing for iterative improvements based on user feedback and system requirements.

---

**Document Status:** Draft v1.0  
**Last Updated:** July 2, 2025  
**Next Review:** July 9, 2025
