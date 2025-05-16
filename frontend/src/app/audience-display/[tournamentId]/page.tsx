"use client";
import { useRouter, useParams } from "next/navigation";
import { useTournament } from "@/hooks/use-tournaments";
import FieldSelectDropdown, { useTournamentFields } from "@/components/fields/FieldSelectDropdown";

export default function FieldSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params?.tournamentId as string;

  // Fetch tournament details
  const { data: tournament, isLoading: isLoadingTournament, isError: isErrorTournament } = useTournament(tournamentId);
  // Fetch fields for this tournament
  const { data: fields = [], isLoading: isLoadingFields, isError: isErrorFields } = useTournamentFields(tournamentId);

  // Handler for field selection
  const handleFieldSelect = (fieldId: string | null) => {
    if (fieldId) {
      router.push(`/audience-display/${tournamentId}/${fieldId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50 py-10 px-4">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-blue-900 font-semibold"
        onClick={() => router.push("/audience-display")}
      >
        ← Back to Tournament List
      </button>
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {isLoadingTournament ? (
          <div className="text-center text-blue-700 text-xl">Loading tournament...</div>
        ) : isErrorTournament || !tournament ? (
          <div className="text-center text-red-600 font-bold text-lg">Could not load tournament details.</div>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-900 drop-shadow">
              {tournament.name} - Select Field
            </h1>
            <div className="text-center text-gray-700 mb-6">
              <span className="font-semibold">Dates:</span> {formatDateRange(tournament.startDate, tournament.endDate)}
            </div>
            <div className="mb-8">
              <label className="block text-blue-900 font-semibold mb-2 text-lg">Select a Field to View</label>
              <FieldSelectDropdown
                tournamentId={tournamentId}
                selectedFieldId={null}
                onFieldSelect={handleFieldSelect}
                showAllFieldsOption={false}
                disabled={isLoadingFields}
              />
            </div>
            {isLoadingFields ? (
              <div className="text-center text-blue-700">Loading fields...</div>
            ) : isErrorFields ? (
              <div className="text-center text-red-600 font-bold">Could not load fields for this tournament.</div>
            ) : fields.length === 0 ? (
              <div className="text-center text-gray-500 font-semibold">This tournament has no fields available for display.</div>
            ) : null}
          </>
        )}
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
