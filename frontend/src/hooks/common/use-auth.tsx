"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContextType, User } from "@/lib/types";
import { apiClient } from "@/lib/api-client";

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Use React Query to fetch current user data
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const data = await apiClient.get<{ user: User | null }>("/auth/check-auth");
        return data.user;
      } catch (err: any) {
        if (err?.response?.status === 401) return null;
        throw new Error('Failed to fetch user data');
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  // Update user state when data changes
  useEffect(() => {
    setUser(data ?? null);
  }, [data]);
  const register = async (username: string, password: string, email?: string) => {
    try {
      await apiClient.post("/auth/register", { username, password, email });
      await login(username, password);
    } catch (error: any) {
      let errorMsg = 'Registration failed';
      if (error?.response?.data?.message) {
        // Handle validation messages that can be arrays or strings
        const message = error.response.data.message;
        if (Array.isArray(message)) {
          errorMsg = message.join('. ');
        } else {
          errorMsg = message;
        }
      }
      throw new Error(errorMsg);
    }
  }  // Login function
  const login = async (username: string, password: string) => {
    try {
      await apiClient.post("/auth/login", { username, password });
      await refetch();
    } catch (error: any) {
      let errorMsg = 'Login failed';
      if (error?.response?.data?.message) {
        // Handle validation messages that can be arrays or strings
        const message = error.response.data.message;
        if (Array.isArray(message)) {
          errorMsg = message.join('. ');
        } else {
          errorMsg = message;
        }
      }
      // Preserve status code for rate limiting detection
      const loginError = new Error(errorMsg) as Error & { status?: number };
      loginError.status = error?.status || error?.response?.status;
      throw loginError;
    }
  };
  
  // Logout function
  const logout = async () => {
    await apiClient.post("/auth/logout", {});
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