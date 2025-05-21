import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsResponse,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface TimerData {
  duration: number;
  remaining: number;
  isRunning: boolean;
  startedAt?: number;
  pausedAt?: number;
  tournamentId: string;
  fieldId?: string;
}

interface MatchData {
  id: string;
  matchNumber: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  tournamentId: string;
  fieldId?: string;
  // Other match properties
}

interface ScoreData {
  matchId: string;
  redAutoScore: number;
  redDriveScore: number;
  redTotalScore: number;
  blueAutoScore: number;
  blueDriveScore: number;
  blueTotalScore: number;
  tournamentId: string;
  fieldId?: string;
  // Other score properties
}

interface MatchStateData {
  matchId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  currentPeriod?: 'auto' | 'teleop' | 'endgame' | null;
  tournamentId: string;
  fieldId?: string;
}

interface AudienceDisplaySettings {
  displayMode: 'match' | 'teams' | 'schedule' | 'rankings' | 'announcement' | 'blank';
  matchId?: string | null;
  showTimer?: boolean;
  showScores?: boolean;
  showTeams?: boolean;
  message?: string;
  tournamentId: string;
  updatedAt: number;
}

interface AnnouncementData {
  message: string;
  tournamentId: string;
  fieldId?: string; // Optional field ID for field-specific announcements
  duration?: number; // How long to show the announcement (in ms)
}

interface JoinRoomData {
  tournamentId: string;
}

@WebSocketGateway({
  cors: {
    origin: '*', // In production, specify your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  
  // Store audience display settings per tournament
  private audienceDisplaySettings: Map<string, AudienceDisplaySettings> = new Map();
  
  // Store active timers per tournament
  private activeTimers: Map<string, NodeJS.Timeout> = new Map();

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  // Join a tournament room
  @SubscribeMessage('join_tournament')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomData
  ): void {
    const { tournamentId } = data;
    client.join(tournamentId);
    this.logger.log(`Client ${client.id} joined room: ${tournamentId}`);
    
    // Send current audience display settings to the newly joined client
    const currentSettings = this.audienceDisplaySettings.get(tournamentId);
    if (currentSettings) {
      client.emit('display_mode_change', currentSettings);
    }
  }

  // Leave a tournament room
  @SubscribeMessage('leave_tournament')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomData
  ): void {
    const { tournamentId } = data;
    client.leave(tournamentId);
    this.logger.log(`Client ${client.id} left room: ${tournamentId}`);
  }
  // Handle match updates (control panel -> audience display)
  @SubscribeMessage('match_update')
  handleMatchUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any // Accept any to allow fieldId
  ): void {
    this.logger.log(`Match update received: ${JSON.stringify(payload)}`);
    if (payload.fieldId) {
      // Use emitToField for field-specific updates
      this.emitToField(payload.fieldId, 'match_update', payload);
      
      // Also emit to tournament for history/archiving
      if (payload.tournamentId) {
        this.server.to(payload.tournamentId).emit('match_update', payload);
      }
    } else if (payload.tournamentId) {
      // fallback for legacy clients
      client.to(payload.tournamentId).emit('match_update', payload);
    }
  }

  // Handle score updates (control panel -> audience display)
  @SubscribeMessage('score_update')
  handleScoreUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any
  ): void {
    this.logger.log(`Score update received: ${JSON.stringify(payload)}`);
    if (payload.fieldId) {
      // Use emitToField for field-specific updates
      this.emitToField(payload.fieldId, 'score_update', payload);
      
      // Also emit to tournament for history/archiving
      if (payload.tournamentId) {
        this.server.to(payload.tournamentId).emit('score_update', payload);
      }
    } else if (payload.tournamentId) {
      client.to(payload.tournamentId).emit('score_update', payload);
    }
  }

  // Handle timer updates (control panel -> audience display)
  @SubscribeMessage('timer_update')
  handleTimerUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any
  ): void {
    this.logger.log(`Timer update received: ${JSON.stringify(payload)}`);
    if (payload.fieldId) {
      // Use emitToField for field-specific updates
      this.emitToField(payload.fieldId, 'timer_update', payload);
      
      // Also emit to tournament for history/archiving
      if (payload.tournamentId) {
        this.server.to(payload.tournamentId).emit('timer_update', payload);
      }
    } else if (payload.tournamentId) {
      client.to(payload.tournamentId).emit('timer_update', payload);
    }
  }
  // Handle match state changes (control panel -> audience display)
  @SubscribeMessage('match_state_change')
  handleMatchStateChange(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any
  ): void {
    this.logger.log(`Match state change received: ${JSON.stringify(payload)}`);
    if (payload.fieldId) {
      // Use emitToField for field-specific updates
      this.emitToField(payload.fieldId, 'match_state_change', payload);
      
      // Also emit to tournament for history/archiving
      if (payload.tournamentId) {
        this.server.to(payload.tournamentId).emit('match_state_change', payload);
      }
    } else if (payload.tournamentId) {
      client.to(payload.tournamentId).emit('match_state_change', payload);
    }
  }
  
  // Handle display mode changes (control panel -> audience display)
  @SubscribeMessage('display_mode_change')
  handleDisplayModeChange(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: AudienceDisplaySettings
  ): void {
    this.logger.log(`Display mode change received: ${JSON.stringify(payload)}`);
    
    // Store the latest settings for this tournament
    this.audienceDisplaySettings.set(payload.tournamentId, payload);
    
    // Broadcast to all clients in the tournament room including the sender
    this.server.to(payload.tournamentId).emit('display_mode_change', payload);
  }
    // Handle announcements (control panel -> audience display)
  @SubscribeMessage('announcement')
  handleAnnouncement(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: AnnouncementData
  ): void {
    this.logger.log(`Announcement received: ${JSON.stringify(payload)}`);
    
    // If fieldId is provided, emit to that specific field, otherwise broadcast to tournament
    if (payload.fieldId) {
      // Create a unique room ID for this field
      const fieldRoomId = `field_${payload.fieldId}`;
      this.logger.log(`Sending field-specific announcement to ${fieldRoomId}`);
      
      // Emit to field-specific room
      this.server.to(fieldRoomId).emit('announcement', payload);
      
      // Also emit to tournament for archiving/history purposes
      this.server.to(payload.tournamentId).emit('announcement', payload);
    } else {
      // Broadcast to all clients in the tournament room including the sender
      client.to(payload.tournamentId).emit('announcement', payload);
    }
  }
  
  // Start a timer for a match (control panel)
  @SubscribeMessage('start_timer')
  handleStartTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TimerData
  ): void {
    const { tournamentId } = payload;
    
    // Clear any existing timer for this tournament
    if (this.activeTimers.has(tournamentId)) {
      clearInterval(this.activeTimers.get(tournamentId));
    }

    // Calculate the correct start time based on remaining time
    const now = Date.now();
    // If remaining is less than duration, adjust startedAt so that (now - startedAt) = (duration - remaining)
    let startTime = now;
    if (payload.remaining !== undefined && payload.remaining < payload.duration) {
      startTime = now - (payload.duration - payload.remaining);
    }
    // Store the adjusted startTime in the payload for interval calculation
    payload.startedAt = startTime;

    // Create a new timer that emits updates every second
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000) * 1000;
      const remaining = Math.max(0, payload.duration - elapsed);
      
      const timerUpdate: TimerData = {
        ...payload,
        remaining,
        isRunning: remaining > 0
      };
      
      // Broadcast timer update to the tournament room
      this.server.to(tournamentId).emit('timer_update', timerUpdate);
      
      // Stop the timer when it reaches zero
      if (remaining <= 0) {
        clearInterval(timer);
        this.activeTimers.delete(tournamentId);
      }
    }, 1000);
    
    this.activeTimers.set(tournamentId, timer);
    this.logger.log(`Timer started for tournament: ${tournamentId}`);
    
    // Initial broadcast
    this.server.to(tournamentId).emit('timer_update', {
      ...payload,
      isRunning: true,
    });
  }
  
  // Pause a timer for a match (control panel)
  @SubscribeMessage('pause_timer')
  handlePauseTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TimerData
  ): void {
    const { tournamentId } = payload;
    
    // Clear the active timer for this tournament
    if (this.activeTimers.has(tournamentId)) {
      clearInterval(this.activeTimers.get(tournamentId));
      this.activeTimers.delete(tournamentId);
    }
    
    // Broadcast the paused timer state
    this.server.to(tournamentId).emit('timer_update', {
      ...payload,
      isRunning: false,
      pausedAt: Date.now()
    });
    
    this.logger.log(`Timer paused for tournament: ${tournamentId}`);
  }
  
  // Reset a timer for a match (control panel)
  @SubscribeMessage('reset_timer')
  handleResetTimer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TimerData
  ): void {
    const { tournamentId } = payload;
    
    // Clear the active timer for this tournament
    if (this.activeTimers.has(tournamentId)) {
      clearInterval(this.activeTimers.get(tournamentId));
      this.activeTimers.delete(tournamentId);
    }
    
    // Broadcast the reset timer state
    this.server.to(tournamentId).emit('timer_update', {
      ...payload,
      remaining: payload.duration,
      isRunning: false,
      startedAt: undefined,
      pausedAt: undefined
    });
    
    this.logger.log(`Timer reset for tournament: ${tournamentId}`);
  }

  // Broadcast a message to all connected clients in a specific tournament
  public broadcastToTournament(tournamentId: string, event: string, payload: any): void {
    this.server.to(tournamentId).emit(event, payload);
    this.logger.log(`Broadcasted ${event} to tournament ${tournamentId}: ${JSON.stringify(payload)}`);
  }

  // Broadcast a message to all connected clients
  public broadcastEvent(event: string, payload: any): void {
    this.server.emit(event, payload);
    this.logger.log(`Broadcasted ${event}: ${JSON.stringify(payload)}`);
  }

  // Add this helper for testability
  public hasActiveTimer(tournamentId: string): boolean {
    return this.activeTimers.has(tournamentId);
  }

  // --- FIELD-SPECIFIC ROOMS ---
  // Join a field-specific room
  @SubscribeMessage('joinFieldRoom')
  handleJoinFieldRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { fieldId: string }
  ): void {
    const { fieldId } = data;
    const fieldRoomId = `field_${fieldId}`;
    client.join(fieldRoomId);
    this.logger.log(`Client ${client.id} joined field room: ${fieldRoomId}`);
  }

  // Leave a field-specific room
  @SubscribeMessage('leaveFieldRoom')
  handleLeaveFieldRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { fieldId: string }
  ): void {
    const { fieldId } = data;
    const fieldRoomId = `field_${fieldId}`;
    client.leave(fieldRoomId);
    this.logger.log(`Client ${client.id} left field room: ${fieldRoomId}`);
  }

  // Emit to a field-specific room (for use by services)
  public emitToField(fieldId: string, event: string, payload: any): void {
    const fieldRoomId = `field_${fieldId}`;
    this.server.to(fieldRoomId).emit(event, payload);
    this.logger.log(`Broadcasted ${event} to ${fieldRoomId}: ${JSON.stringify(payload)}`);
  }
}