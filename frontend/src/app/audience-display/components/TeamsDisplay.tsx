import React from 'react';
import { Card } from '@/components/ui/card';

// Define Team interface
export interface Team {
  id: string;
  name: string;
  teamNumber?: string;
  organization?: string;
  location?: string;
}

interface TeamsDisplayProps {
  teams: Team[];
  isLoading: boolean;
}

export const TeamsDisplay: React.FC<TeamsDisplayProps> = ({ teams, isLoading }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Teams Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 shadow-xl text-white p-8 text-center rounded-b-3xl border-b-4 border-blue-400 relative animate-fade-in">
        <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-lg mb-2">Tournament Teams</h2>
        <p className="mt-2 text-blue-200 text-lg font-semibold animate-fade-in-slow">
          <span className="text-yellow-300 text-2xl font-bold">{teams.length}</span> {teams.length === 1 ? 'team' : 'teams'} registered
        </p>
        <div className="absolute right-8 top-8 flex items-center space-x-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs text-green-200 font-semibold">Live</span>
        </div>
      </div>
      {/* Teams List Table */}
      <div className="flex-1 p-8 overflow-auto bg-gradient-to-b from-gray-50 to-blue-50">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64 animate-pulse">
            <div className="text-2xl text-blue-400 font-bold mb-2">Loading teams...</div>
            <div className="w-32 h-2 bg-blue-200 rounded-full animate-pulse"></div>
          </div>
        ) : teams.length > 0 ? (
          <div className="overflow-hidden shadow-2xl rounded-2xl border-2 border-blue-100 animate-fade-in">
            <table className="min-w-full bg-white divide-y divide-blue-100">
              <thead className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-bold uppercase tracking-wider">Team #</th>
                  <th className="px-6 py-4 text-left text-lg font-bold uppercase tracking-wider">Team Name</th>
                  <th className="px-6 py-4 text-left text-lg font-bold uppercase tracking-wider hidden md:table-cell">Organization</th>
                  <th className="px-6 py-4 text-left text-lg font-bold uppercase tracking-wider hidden lg:table-cell">Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-50">
                {teams.map((team, index) => (
                  <tr 
                    key={team.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-yellow-50 transition-colors animate-fade-in`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-blue-200 text-blue-900 font-extrabold text-xl border-2 border-yellow-400 shadow">
                          {team.teamNumber || '—'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-blue-900">{team.name}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-md text-blue-700 font-semibold">{team.organization || '—'}</div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-md text-blue-700 font-semibold">{team.location || '—'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-xl p-12 border-2 border-blue-100 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-200 mb-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div className="text-2xl font-bold text-blue-400 mb-2">No teams available</div>
            <p className="text-blue-300 mt-2">No teams have been registered for this tournament yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsDisplay;