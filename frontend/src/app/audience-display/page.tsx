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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50 py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900 drop-shadow">Robotics Tournaments</h1>
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search tournaments by name..."
          className="w-full px-4 py-2 border rounded-lg shadow"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></span>
        </div>
      )}
      {isError && (
        <div className="text-center text-red-600 font-bold text-lg py-10">
          Could not load tournaments. Please try again later.
        </div>
      )}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="text-center text-gray-500 font-semibold text-lg py-10">
          No tournaments available at the moment
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {filtered.map((t: Tournament) => (
          <Card key={t.id} className="hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push(`/audience-display/${t.id}`)}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-900">{t.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700 mb-2">
                <span className="font-semibold">Dates:</span> {formatDateRange(t.startDate, t.endDate)}
              </div>
              {t.description && <div className="text-gray-500 mb-2">{t.description}</div>}
              {t.numberOfFields !== undefined && (
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Fields:</span> {t.numberOfFields}
                </div>
              )}
              {t.admin && t.admin.username && (
                <div className="text-gray-500 text-sm">Admin: {t.admin.username}</div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-blue-800 font-semibold">Location TBA</span>
              <button
                className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg shadow"
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