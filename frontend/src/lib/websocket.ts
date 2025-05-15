import { io, Socket } from 'socket.io-client';


export interface IWebSocketService {
  connect(url?: string): void;
  disconnect(): void;
  on<T = any>(event: string, callback: (data: T) => void): () => void;
  off(event: string): void;
  emit(event: string, data: any): void;
  isConnected(): boolean;
  joinTournament(id: string): void;
  leaveTournament(id: string): void;
  sendDisplayModeChange(settings: any): void;
  sendMatchUpdate(data: any): void;
  sendScoreUpdate(data: any): void;
  sendMatchStateChange(data: any): void;
  startTimer(data: any): void;
  pauseTimer(data: any): void;
  resetTimer(data: any): void;
  sendAnnouncement(data: any): void;
}


class WebSocketService implements IWebSocketService {
  private static instance: WebSocketService;
  private socket: Socket | null = null;
  private listeners: Map<string, Set<(...args: any[]) => void>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 100; // 2 seconds initial delay

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(url?: string): void {
    if (!this.socket) {
      // Get the backend URL from environment variables or use a default
      const backendUrl = url || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

      this.socket = io(backendUrl, {
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        reconnectionDelayMax: 10000, // 10 seconds max delay
      });

      // Setup connection event handlers
      this.socket.on('connect', () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      });

      this.socket.on('disconnect', (reason) => {
        console.log(`WebSocket disconnected: ${reason}`);
      });

      this.socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        this.reconnectAttempts++;

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.error('Max reconnection attempts reached, giving up');
          this.socket?.disconnect();
        }
      });

      // Setup listeners for all registered events
      this.listeners.forEach((callbacks, event) => {
        callbacks.forEach(callback => {
          this.socket?.on(event, callback);
        });
      });
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public on<T = any>(event: string, callback: (data: T) => void): () => void {
    // Initialize set if it doesn't exist
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    // Add callback to listeners
    this.listeners.get(event)?.add(callback);

    // Add listener to socket if already connected
    if (this.socket) {
      this.socket.on(event, callback);
    }

    // Return a function to remove this listener
    return () => {
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        callbacks.delete(callback);
        if (this.socket) {
          this.socket.off(event, callback as any);
        }
      }
    };
  }

  public off(event: string): void {
    // Remove all listeners for the event
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)!;
      callbacks.forEach(cb => {
        if (this.socket) this.socket.off(event, cb as any);
      });
      this.listeners.delete(event);
    }
  }

  public emit(event: string, data: any): void {
    if (!this.socket || !this.socket.connected) {
      console.error('Failed to emit event, socket not connected', { event, data });
      // Try to reconnect and queue the event
      this.connect();
      setTimeout(() => {
        if (this.socket && this.socket.connected) {
          this.socket.emit(event, data);
        } else {
          console.error('Still not connected, event not sent:', event);
        }
      }, 500);
      return;
    }
    this.socket.emit(event, data);
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // --- Domain-specific methods (SRP) ---
  public joinTournament(id: string): void {
    this.emit('join_tournament', { tournamentId: id });
  }

  public leaveTournament(id: string): void {
    this.emit('leave_tournament', { tournamentId: id });
  }

  public sendDisplayModeChange(settings: any): void {
    this.emit('display_mode_change', settings);
  }

  public sendMatchUpdate(data: any): void {
    this.emit('match_update', data);
  }

  public sendScoreUpdate(data: any): void {
    this.emit('score_update', data);
  }

  public sendMatchStateChange(data: any): void {
    this.emit('match_state_change', data);
  }
  public startTimer(data: any): void {
    this.emit('start_timer', data);
  }

  public pauseTimer(data: any): void {
    this.emit('pause_timer', data);
  }

  public resetTimer(data: any): void {
    this.emit('reset_timer', data);
  }

  public sendAnnouncement(data: any): void {
    this.emit('announcement', data);
  }
}

// Export the singleton instance
const websocketService = WebSocketService.getInstance();
export default websocketService;