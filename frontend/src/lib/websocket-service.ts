import { io, Socket } from 'socket.io-client';

// Define event types that match our backend
export interface TimerData {
  duration: number;
  remaining: number;
  isRunning: boolean;
  startedAt?: number;
  pausedAt?: number;
  tournamentId: string;
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
  }>;
  blueGameElements?: Array<{
    element: string;
    count: number;
    pointsEach: number;
    totalPoints: number;
    operation: string;
  }>;
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
  updatedAt: number;
}

export interface AnnouncementData {
  message: string;
  tournamentId: string;
  duration?: number; // How long to show the announcement (in ms)
}

export type EventCallback<T> = (data: T) => void;

// Define the WebSocket service class
class WebSocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private currentTournamentId: string | null = null;
  private readonly RECONNECT_INTERVAL = 5000; // 5 seconds

  // Store event listeners
  private eventListeners: {
    [eventName: string]: Array<EventCallback<any>>;
  } = {};

  // Connect to the WebSocket server
  connect(url: string = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001'): void {
    if (this.socket) {
      return;
    }

    this.socket = io(url, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('WebSocket connected');
      
      // Rejoin tournament room if there was one
      if (this.currentTournamentId) {
        this.joinTournament(this.currentTournamentId);
      }
      
      // Clear reconnect timer if it exists
      if (this.reconnectTimer) {
        clearInterval(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('WebSocket disconnected');
      
      // Set up reconnect timer if not already active
      if (!this.reconnectTimer) {
        this.reconnectTimer = setInterval(() => {
          if (!this.isConnected && this.socket) {
            this.socket.connect();
          }
        }, this.RECONNECT_INTERVAL);
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connect error:', error);
    });
    
    // Set up listeners for our standard events
    this.setupEventListeners();
  }

  // Set up standard event listeners
  private setupEventListeners(): void {
    if (!this.socket) return;
    
    const events = [
      'match_update',
      'score_update',
      'timer_update',
      'match_state_change',
      'display_mode_change',
      'announcement',
    ];
    
    events.forEach(eventName => {
      this.socket?.on(eventName, (data: any) => {
        // Call all registered callbacks for this event
        const callbacks = this.eventListeners[eventName] || [];
        callbacks.forEach(callback => callback(data));
        
        // Debug log
        console.log(`Received ${eventName}:`, data);
      });
    });
  }

  // Disconnect from the WebSocket server
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      
      if (this.reconnectTimer) {
        clearInterval(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    }
  }

  // Join a tournament room
  joinTournament(tournamentId: string): void {
    if (!this.socket || !this.isConnected) {
      this.currentTournamentId = tournamentId;
      return;
    }
    
    this.socket.emit('join_tournament', { tournamentId });
    this.currentTournamentId = tournamentId;
    console.log(`Joined tournament room: ${tournamentId}`);
  }

  // Leave a tournament room
  leaveTournament(tournamentId: string): void {
    if (!this.socket || !this.isConnected) return;
    
    this.socket.emit('leave_tournament', { tournamentId });
    
    if (this.currentTournamentId === tournamentId) {
      this.currentTournamentId = null;
    }
    
    console.log(`Left tournament room: ${tournamentId}`);
  }

  // Send a match update
  sendMatchUpdate(matchData: MatchData): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('match_update', matchData);
  }

  // Send a score update
  sendScoreUpdate(scoreData: ScoreData): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('score_update', scoreData);
  }

  // Send a match state change
  sendMatchStateChange(stateData: MatchStateData): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('match_state_change', stateData);
  }

  // Send a display mode change
  sendDisplayModeChange(displaySettings: AudienceDisplaySettings): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('display_mode_change', {
      ...displaySettings,
      updatedAt: Date.now(),
    });
  }

  // Send an announcement
  sendAnnouncement(announcementData: AnnouncementData): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('announcement', announcementData);
  }

  // Start a timer
  startTimer(timerData: TimerData): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('start_timer', {
      ...timerData,
      startedAt: Date.now(),
      isRunning: true,
    });
  }

  // Pause a timer
  pauseTimer(timerData: TimerData): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('pause_timer', timerData);
  }

  // Reset a timer
  resetTimer(timerData: TimerData): void {
    if (!this.socket || !this.isConnected) return;
    this.socket.emit('reset_timer', timerData);
  }

  // Add an event listener
  on<T>(eventName: string, callback: EventCallback<T>): () => void {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
    
    // Return a function to remove this specific listener
    return () => {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(
        cb => cb !== callback
      );
    };
  }

  // Remove all event listeners for a specific event
  off(eventName: string): void {
    this.eventListeners[eventName] = [];
  }

  // Get connection status
  isConnectedToServer(): boolean {
    return this.isConnected;
  }
  
  // Get current tournament ID
  getCurrentTournamentId(): string | null {
    return this.currentTournamentId;
  }
}

// Create a singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;