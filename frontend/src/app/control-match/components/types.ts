export interface ConnectionStatusProps {
    /**
     * Indicates if the WebSocket connection is active
     */
    isConnected: boolean;
    
    /**
     * The tournament ID for the active connection
     */
    tournamentId: string | null;
  }
  