'use client';

import React from 'react';
import UserManagement from '@/components/admin/UserManagement';

/**
 * Admin User Management Page
 * 
 * Access control is handled by middleware.ts:
 * - JWT authentication verification
 * - ADMIN role requirement for /users route
 * - Automatic redirect to /login if not authenticated
 * - Automatic redirect to /access-denied if not ADMIN
 * 
 * If this component renders, the user is authenticated and has ADMIN role.
 */
export default function UsersPage() {
  console.log('[Users Page] Rendering - middleware has verified ADMIN access');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">
            Manage users, roles, and permissions for the tournament system.
          </p>
        </div>
        
        <UserManagement />
      </div>
    </div>
  );
}
