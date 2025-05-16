import { io, Socket } from 'socket.io-client';

// Define event types that match our backend
export interface TimerData {
  duration: number;
  remaining: number;
  isRunning: boolean;
  startedAt?: number;
  pausedAt?: number;
  tournamentId: string;
  fieldId?: string; // Optional field ID for field-specific timer updates
}

export interface MatchData {
  id: string;
  matchNumber: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  tournamentId: string;
  // Other match properties
}

export interface ScoreData {
  matchId: string;
  redAutoScore: number;
  redDriveScore: number;
  redTotalScore: number;
  blueAutoScore: number;
  blueDriveScore: number;
  blueTotalScore: number;
  tournamentId: string;
  redGameElements?: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }> | Record<string, number>; // Accept both array and object formats
  blueGameElements?: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }> | Record<string, number>; // Accept both array and object formats
  redTeamCount?: number;
  redMultiplier?: number;
  blueTeamCount?: number;
  blueMultiplier?: number;
  scoreDetails?: Record<string, any>;
}

export interface MatchStateData {
  matchId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  currentPeriod?: 'auto' | 'teleop' | 'endgame' | null;
  tournamentId: string;
}

export interface AudienceDisplaySettings {
  displayMode: 'match' | 'teams' | 'schedule' | 'rankings' | 'announcement' | 'blank';
  matchId?: string | null;
  showTimer?: boolean;
  showScores?: boolean;
  showTeams?: boolean;
  message?: string;
  tournamentId: string;
  fieldId?: string;
  updatedAt: number;
}

export interface AnnouncementData {
  message: string;
  tournamentId: string;
  fieldId?: string; // Optional field ID for field-specific announcements
  duration?: number; // How long to show the announcement (in ms)
}

export type EventCallback<T> = (data: T) => void;

// Define a type for all event names
export type WebSocketEvent =
  | 'display_mode_change'
  | 'match_update'
  | 'score_update'
  | 'timer_update'
  | 'match_state_change'
  | 'announcement';

// SOLID: Interface for WebSocket connection strategy
interface IWebSocketConnection {
  connect(url?: string): void;
  disconnect(): void;
  isConnectedToServer(): boolean;
}

// SOLID: Interface for event emitter/listener
interface IWebSocketEventManager {
  on<T>(eventName: WebSocketEvent, callback: EventCallback<T>): () => void;
  off(eventName: WebSocketEvent): void;
  emit<T>(eventName: WebSocketEvent, data: T): void;
}

// SOLID: Concrete implementation for Socket.IO
class SocketIOConnection implements IWebSocketConnection, IWebSocketEventManager {
  private socket: Socket | null = null;
  private isConnected = false;
  private initialized = false;
  private eventListeners: { [eventName: string]: Array<EventCallback<any>> } = {};
  private currentTournamentId: string | null = null;

  connect(url: string = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000'): void {
    if (this.socket) return;
    this.socket = io(url, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });
    this.socket.on('connect', () => {
      this.isConnected = true;
      if (this.currentTournamentId) {
        this.joinTournament(this.currentTournamentId);
      }
    });
    this.socket.on('disconnect', () => {
      this.isConnected = false;
    });
    if (!this.initialized) {
      this.initialized = true;
      this.setupEventListeners();
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  isConnectedToServer(): boolean {
    return this.isConnected;
  }

  on<T>(eventName: WebSocketEvent, callback: EventCallback<T>): () => void {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
    return () => {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(cb => cb !== callback);
    };
  }

  off(eventName: WebSocketEvent): void {
    this.eventListeners[eventName] = [];
  }

  emit<T>(eventName: WebSocketEvent, data: T): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit(eventName, data);
  }

  private setupEventListeners(): void {
    if (!this.socket) return;
    const events: WebSocketEvent[] = [
      'display_mode_change',
      'match_update',
      'score_update',
      'timer_update',
      'match_state_change',
      'announcement',
    ];
    events.forEach(eventName => {
      this.socket!.off(eventName);
      this.socket!.on(eventName, (data: any) => {
        (this.eventListeners[eventName] || []).forEach(cb => cb(data));
      });
    });
  }

  // Room join/leave
  joinTournament(tournamentId: string): void {
    if (!this.socket || !this.isConnected) {
      this.currentTournamentId = tournamentId;
      return;
    }
    this.socket.emit('join_tournament', { tournamentId });
    this.currentTournamentId = tournamentId;
  }

  leaveTournament(tournamentId: string): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('leave_tournament', { tournamentId });
    if (this.currentTournamentId === tournamentId) {
      this.currentTournamentId = null;
    }
  }

  getCurrentTournamentId(): string | null {
    return this.currentTournamentId;
  }
}

// SOLID: WebSocketService as a facade
class WebSocketService {
  private connection: IWebSocketConnection & IWebSocketEventManager;
  constructor(connection: IWebSocketConnection & IWebSocketEventManager) {
    this.connection = connection;
  }
  connect(url?: string) { this.connection.connect(url); }
  disconnect() { this.connection.disconnect(); }
  isConnectedToServer() { return this.connection.isConnectedToServer(); }
  on<T>(eventName: WebSocketEvent, callback: EventCallback<T>) { return this.connection.on(eventName, callback); }
  off(eventName: WebSocketEvent) { this.connection.off(eventName); }
  emit<T>(eventName: WebSocketEvent, data: T) { this.connection.emit(eventName, data); }
  joinTournament(tournamentId: string) { (this.connection as any).joinTournament(tournamentId); }
  leaveTournament(tournamentId: string) { (this.connection as any).leaveTournament(tournamentId); }
  getCurrentTournamentId() { return (this.connection as any).getCurrentTournamentId(); }
  // Convenience methods for emitting specific events
  sendMatchUpdate(matchData: MatchData) { this.emit('match_update', matchData); }
  sendScoreUpdate(scoreData: ScoreData) { this.emit('score_update', scoreData); }
  sendMatchStateChange(stateData: MatchStateData) { this.emit('match_state_change', stateData); }
  sendDisplayModeChange(displaySettings: AudienceDisplaySettings) { this.emit('display_mode_change', { ...displaySettings, updatedAt: Date.now() }); }
  sendAnnouncement(announcementData: AnnouncementData) { this.emit('announcement', announcementData); }
  startTimer(timerData: TimerData) { this.emit('timer_update', { ...timerData, startedAt: Date.now(), isRunning: true }); }
  pauseTimer(timerData: TimerData) { this.emit('timer_update', { ...timerData, isRunning: false }); }
  resetTimer(timerData: TimerData) { this.emit('timer_update', { ...timerData, isRunning: false, remaining: timerData.duration }); }
}

// Singleton instance
const webSocketService = new WebSocketService(new SocketIOConnection());
export default webSocketService;