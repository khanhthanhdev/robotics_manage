import { io, Socket } from 'socket.io-client';

// Singleton pattern for Socket.IO client instance
class WebSocketService {
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

  public connect(): Socket {
    if (!this.socket) {
      // Get the backend URL from environment variables or use a default
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      
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
    
    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public on(event: string, callback: (...args: any[]) => void): () => void {
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

  public emit(event: string, data: any): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, attempting to connect before emitting');
      this.connect();
      // Add a small delay to ensure connection is established
      setTimeout(() => {
        if (this.socket?.connected) {
          this.socket.emit(event, data);
        } else {
          console.error('Failed to emit event, socket not connected', { event, data });
        }
      }, 500);
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Export the singleton instance
const websocketService = WebSocketService.getInstance();
export default websocketService;