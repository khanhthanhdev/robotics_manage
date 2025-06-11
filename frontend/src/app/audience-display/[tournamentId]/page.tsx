"use client";
import { useRouter, useParams } from "next/navigation";
import { useTournament } from "@/hooks/api/use-tournaments";
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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <button
        className="mb-6 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-semibold shadow-sm transition-colors duration-200"
        onClick={() => router.push("/audience-display")}
      >
        ← Back to Tournament List
      </button>
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-8">        {isLoadingTournament ? (
          <div className="text-center text-blue-800 text-xl font-semibold">Loading tournament...</div>
        ) : isErrorTournament || !tournament ? (
          <div className="text-center text-red-800 bg-red-50 border border-red-200 rounded-xl p-6 font-semibold text-lg">Could not load tournament details.</div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">
              {tournament.name} - Select Field
            </h1>
            <div className="text-center text-gray-700 mb-6">
              <span className="font-semibold text-gray-900">Dates:</span> {formatDateRange(tournament.startDate, tournament.endDate)}
            </div>
            <div className="mb-8">
              <label className="block text-gray-900 font-semibold mb-3 text-lg">Select a Field to View</label>
              <FieldSelectDropdown
                tournamentId={tournamentId}
                selectedFieldId={null}
                onFieldSelect={handleFieldSelect}
                showAllFieldsOption={false}
                disabled={isLoadingFields}
              />
            </div>            {isLoadingFields ? (
              <div className="text-center text-blue-800 font-semibold">Loading fields...</div>
            ) : isErrorFields ? (
              <div className="text-center text-red-800 bg-red-50 border border-red-200 rounded-xl p-4 font-semibold">Could not load fields for this tournament.</div>
            ) : fields.length === 0 ? (
              <div className="text-center text-gray-600 bg-gray-50 border border-gray-200 rounded-xl p-4 font-semibold">This tournament has no fields available for display.</div>
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
