/**

 * This module implements centralized authentication state management using React Context.
 * 
 * Features:
 * - Centralized authentication state management
 * - Secure error handling and logging
 * - React Query integration for efficient data fetching
 * - Type-safe API with comprehensive TypeScript support
 * - RBAC logging for security auditing
 * 
 * @author Robotics Tournament Management System
 * @version 1.0.0
 */

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "@/lib/types";
import { authService, AuthError, AuthErrorType } from "@/services/authService";
import { rbacLogger } from "../../utils/rbacLogger";

// Create the auth context with strict typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * 
 * Provides authentication state management using React Context.
 * Follows the Provider pattern and Dependency Injection principles.
 * Uses React Query for efficient data fetching and caching.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  // Use React Query to manage authentication state with proper error handling
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
  
  // Sync user state with query data
  useEffect(() => {
    setUser(data ?? null);
  }, [data]);

  /**
   * Register a new user and automatically log them in
   */
  const register = async (username: string, password: string, email?: string): Promise<void> => {
    try {
      await authService.register({ username, password, email });
      await login(username, password);
    } catch (error) {
      // Re-throw AuthError for proper error handling
      throw error;
    }
  };

  /**
   * Log in user and refresh authentication state
   */
  const login = async (username: string, password: string): Promise<void> => {
    try {
      await authService.login({ username, password });
      await refetch(); // Refetch user data after successful login
    } catch (error) {
      // Re-throw AuthError for proper error handling
      throw error;
    }
  };

  /**
   * Log out user and clear authentication state
   */
  const logout = async (): Promise<void> => {
    // Log the logout event before clearing state
    if (user) {
      await rbacLogger.logout(user.id, user.role);
    }
    
    await authService.logout();
    setUser(null);
    await refetch(); // This will return null and update the state
    
    // Small delay to ensure state updates are processed before redirect
    setTimeout(() => {
      router.push('/login');
    }, 100);
  };

  // Create context value with all required methods and state
  const contextValue: AuthContextType = {
    user,
    isLoading,
    error: error as Error | null,
    login,
    logout,
    register
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * 
 * Custom hook for accessing authentication context.
 * Provides type-safe access to authentication state and methods.
 * 
 * @throws {Error} When used outside of AuthProvider
 * @returns {AuthContextType} Authentication context with user state and methods
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure to wrap your component tree with <AuthProvider>.'
    );
  }
  
  return context;
}