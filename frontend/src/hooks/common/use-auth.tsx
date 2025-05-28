"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContextType, User } from "@/lib/types";

// User type definition



// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - update to correct server port
const NEXT_PUBLIC_API_URL= 'http://localhost:5000/api';

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Use React Query to fetch current user data
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/check-auth`, {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 401) {
          return null;
        }
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data.user;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  // Update user state when data changes
  useEffect(() => {
    setUser(data);
  }, [data]);

  const register = async (username: string, password: string, email?: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
        credentials: 'include',
      });
      if (!response.ok) {
        let errorMsg = 'Registration failed';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      // Registration successful, now log in the user
      await login(username, password);
      // No refetch here
    } catch (error) {
      throw error;
    }
  }
    // Login function
  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting login with:', { username, apiUrl: NEXT_PUBLIC_API_URL });
      
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      
      console.log('Login response status:', response.status);
      console.log('Login response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        let errorMsg = 'Login failed'; 
        try {
          const errorData = await response.json();
          console.log('Error response data:', errorData);
          errorMsg = errorData.message || errorMsg;
        } catch (parseError) {
          console.log('Failed to parse error response:', parseError);
          const textResponse = await response.text();
          console.log('Raw error response:', textResponse);
        }
        throw new Error(errorMsg);
      }
      
      const responseData = await response.json();
      console.log('Successful login response:', responseData);
      
      // Refetch user state after successful login
      await refetch();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // Logout function
  const logout = async () => {
    await fetch(`${NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    await refetch();
  };
  
  // Create context value
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

// Auth hook
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}