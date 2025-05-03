"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserRole } from "@/lib/types";

// User type definition
type User = {
  id: string;
  username: string;
  role: UserRole;
  email?: string;
};

// Auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string, email?: string) => Promise<void>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - update to correct server port
const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from local storage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
};

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Use React Query to fetch current user data
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = getAuthToken();
      
      if (!token) {
        return null;
      }
      
      const response = await fetch(`${API_BASE_URL}/auth/check-auth`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Clear invalid token
          localStorage.removeItem('auth-token');
          return null;
        }
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      return data.user;
    },
    retry: false,
    refetchOnWindowFocus: false,
    // Only run the query if there's a token
    enabled: !!getAuthToken()
  });
  
  // Update user state when data changes
  useEffect(() => {
    setUser(data);
  }, [data]);

  const register = async (username: string, password: string, email?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const { access_token, user } = await response.json();
      
      // Store token in local storage
      localStorage.setItem('auth-token', access_token);
      
      // Set the user directly from response to avoid an additional API call
      setUser(user);
    } catch (error) {
      throw error;
    }
  }
  
  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const { access_token, user } = await response.json();
      
      // Store token in local storage
      localStorage.setItem('auth-token', access_token);
      
      // Set the user directly from response to avoid an additional API call
      setUser(user);
      
      // Refetch user data
      await refetch();
    } catch (error) {
      throw error;
    }
  };
  
  // Logout function
  const logout = async () => {
    // Remove token from local storage
    localStorage.removeItem('auth-token');
    
    // Clear user state
    setUser(null);
    
    // Refetch user data (which will now return null)
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