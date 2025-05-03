"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

// Error log types
export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  resolved: boolean;
  matchId?: string;
}

// Local storage key for error logs
const ERROR_LOGS_STORAGE_KEY = 'match-control-error-logs';

/**
 * Get error logs from localStorage
 * @returns Array of error logs
 */
const getStoredErrorLogs = (): ErrorLogEntry[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedLogs = localStorage.getItem(ERROR_LOGS_STORAGE_KEY);
    return storedLogs ? JSON.parse(storedLogs) : [];
  } catch (error) {
    console.error('Failed to parse stored error logs:', error);
    return [];
  }
};

/**
 * Save error logs to localStorage
 * @param logs Array of error logs to save
 */
const saveErrorLogs = (logs: ErrorLogEntry[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(ERROR_LOGS_STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save error logs:', error);
  }
};

/**
 * Fetch error logs from localStorage
 * @param showResolved Whether to include resolved errors
 * @returns Array of filtered error logs
 */
const fetchErrorLogs = async (showResolved: boolean = false): Promise<ErrorLogEntry[]> => {
  const logs = getStoredErrorLogs();
  return showResolved ? logs : logs.filter(log => !log.resolved);
};

/**
 * Log a new error
 * @param params Error parameters
 * @returns The newly created error log
 */
const logMatchError = async ({ 
  matchId,
  message,
  severity 
}: {
  matchId: string,
  message: string,
  severity: 'info' | 'warning' | 'error'
}): Promise<ErrorLogEntry> => {
  const newError: ErrorLogEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    message,
    severity,
    resolved: false,
    matchId
  };
  
  const currentLogs = getStoredErrorLogs();
  const updatedLogs = [newError, ...currentLogs];
  
  saveErrorLogs(updatedLogs);
  return newError;
};

/**
 * Mark an error as resolved
 * @param errorId ID of the error to resolve
 * @returns The resolved error log
 */
const resolveError = async (errorId: string): Promise<ErrorLogEntry> => {
  const currentLogs = getStoredErrorLogs();
  const errorIndex = currentLogs.findIndex(log => log.id === errorId);
  
  if (errorIndex === -1) {
    throw new Error('Error log not found');
  }
  
  const updatedError = {
    ...currentLogs[errorIndex],
    resolved: true
  };
  
  const updatedLogs = [...currentLogs];
  updatedLogs[errorIndex] = updatedError;
  
  saveErrorLogs(updatedLogs);
  return updatedError;
};

/**
 * Custom hook for retrieving error logs
 * @param showResolved Whether to include resolved errors
 * @returns Query results containing error logs
 */
export function useErrorLogs(showResolved: boolean = false) {
  return useQuery({
    queryKey: ['errorLogs', showResolved],
    queryFn: () => fetchErrorLogs(showResolved),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    retry: 1,
  });
}

/**
 * Custom hook for logging match errors
 * @returns Mutation function for logging errors
 */
export function useLogMatchError() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logMatchError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['errorLogs'] });
      toast.success('Error logged successfully');
    },
    onError: (error) => {
      toast.error(`Failed to log error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
}

/**
 * Custom hook for resolving errors
 * @returns Mutation function for resolving errors
 */
export function useResolveError() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: resolveError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['errorLogs'] });
      toast.success(`Error marked as resolved`);
    },
    onError: (error) => {
      toast.error(`Failed to resolve error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
}