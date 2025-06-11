'use client';
import { useRouter } from 'next/navigation';
import { useTournaments} from '@/hooks/api/use-tournaments';
import type { Tournament } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useState } from 'react';

export default function AudienceDisplayPage() {
  // Search/filter state
  const [search, setSearch] = useState('');
  const router = useRouter();
  // Fetch tournaments
  const { data: tournaments = [], isLoading, isError } = useTournaments();

  // Filter tournaments by search
  const filtered = tournaments.filter((t: Tournament) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Robotics Tournaments</h1>
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search tournaments by name..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      {isError && (
        <div className="text-center text-red-800 bg-red-50 border border-red-200 rounded-xl p-6 font-semibold text-lg py-10 mx-auto max-w-md">
          Could not load tournaments. Please try again later.
        </div>
      )}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="text-center text-gray-600 font-semibold text-lg py-10">
          No tournaments available at the moment
        </div>
      )}      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {filtered.map((t: Tournament) => (
          <Card key={t.id} className="bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-200 cursor-pointer hover:border-blue-300" onClick={() => router.push(`/audience-display/${t.id}`)}>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">{t.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-900">Dates:</span> {formatDateRange(t.startDate, t.endDate)}
              </div>
              {t.description && <div className="text-gray-600 mb-3 text-sm">{t.description}</div>}
              {t.numberOfFields !== undefined && (
                <div className="text-gray-700 mb-3">
                  <span className="font-semibold text-gray-900">Fields:</span> {t.numberOfFields}
                </div>
              )}
              {t.admin && t.admin.username && (
                <div className="text-gray-600 text-sm">Admin: {t.admin.username}</div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-blue-800 font-semibold text-sm">Location TBA</span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                onClick={e => { e.stopPropagation(); router.push(`/audience-display/${t.id}`); }}
              >
                View Tournament
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return '';
  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  if (s.toDateString() === e.toDateString()) return s.toLocaleDateString(undefined, opts);
  return `${s.toLocaleDateString(undefined, opts)} - ${e.toLocaleDateString(undefined, opts)}`;
}