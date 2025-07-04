/**
 * UserStats Component
 * Displays user statistics with role distribution
 */

import React from 'react';
import { UserStatsProps, UserRole } from '../../types/user.types';

const ROLE_COLORS = {
  [UserRole.ADMIN]: 'bg-red-500',
  [UserRole.HEAD_REFEREE]: 'bg-orange-500',
  [UserRole.ALLIANCE_REFEREE]: 'bg-blue-500',
  [UserRole.TEAM_LEADER]: 'bg-green-500',
  [UserRole.TEAM_MEMBER]: 'bg-cyan-500',
  [UserRole.COMMON]: 'bg-gray-500',
};

const ROLE_LABELS = {
  [UserRole.ADMIN]: 'Administrators',
  [UserRole.HEAD_REFEREE]: 'Head Referees',
  [UserRole.ALLIANCE_REFEREE]: 'Alliance Referees',
  [UserRole.TEAM_LEADER]: 'Team Leaders',
  [UserRole.TEAM_MEMBER]: 'Team Members',
  [UserRole.COMMON]: 'Common Users',
};

export const UserStats: React.FC<UserStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats || typeof stats !== 'object') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800">Unable to load user statistics</p>
      </div>
    );
  }

  // Ensure stats has the expected structure
  const validStats = Object.values(UserRole).reduce((acc, role) => {
    acc[role] = typeof stats[role] === 'number' ? stats[role] : 0;
    return acc;
  }, {} as Record<UserRole, number>);

  const totalUsers = Object.values(validStats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {Object.entries(validStats).map(([role, count]) => {
        const roleKey = role as UserRole;
        const percentage = totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0;
        
        return (
          <div
            key={role}
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-3 h-3 rounded-full ${ROLE_COLORS[roleKey]}`}></div>
              <span className="text-2xl font-bold text-gray-900">{count}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {ROLE_LABELS[roleKey]}
            </h3>
            <p className="text-xs text-gray-500">
              {percentage}% of total
            </p>
          </div>
        );
      })}
      
      {/* Total Users Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="w-3 h-3 rounded-full bg-white bg-opacity-30"></div>
          <span className="text-2xl font-bold">{totalUsers}</span>
        </div>
        <h3 className="text-sm font-medium mb-1">Total Users</h3>
        <p className="text-xs opacity-80">All roles</p>
      </div>
    </div>
  );
};

export default UserStats;
