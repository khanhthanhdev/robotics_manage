"use client";

import { useState, useEffect, useMemo } from "react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, UploadIcon, DownloadIcon } from "lucide-react";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { LeaderboardFilters } from "@/components/LeaderboardFilters";
import { teamLeaderboardColumns, TeamLeaderboardRow } from "@/components/teamLeaderboardColumns";

interface Team {
  id: string;
  teamNumber: string;
  name: string;
  organization?: string;
  description?: string;
  avatar?: string;
  tournamentId?: string;
  teamMembers?: any;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importContent, setImportContent] = useState("");
  const [importResult, setImportResult] = useState<any>(null);

  // State for leaderboard filters
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [rankRange, setRankRange] = useState<[number, number]>([1, 100]);
  const [totalScoreRange, setTotalScoreRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<Team[]>("/teams");
      setTeams(data);
    } catch (e: any) {
      setError(e.message || "Failed to load teams");
    } finally {
      setLoading(false);
    }
  }

  // Transform teams to leaderboard rows (mock rank/score for demo)
  const leaderboardRows: TeamLeaderboardRow[] = useMemo(
    () =>
      teams.map((t, i) => ({
        id: t.id,
        teamName: t.name,
        teamCode: t.teamNumber,
        rank: i + 1, // Replace with real rank if available
        totalScore: Math.floor(Math.random() * 1000), // Replace with real data
        highestScore: Math.floor(Math.random() * 300), // Replace with real data
      })),
    [teams]
  );

  // Filtering logic
  const filteredRows = useMemo(
    () =>
      leaderboardRows.filter(
        (row) =>
          (!teamName || row.teamName.toLowerCase().includes(teamName.toLowerCase())) &&
          (!teamCode || row.teamCode.toLowerCase().includes(teamCode.toLowerCase())) &&
          row.rank >= rankRange[0] &&
          row.rank <= rankRange[1] &&
          row.totalScore >= totalScoreRange[0] &&
          row.totalScore <= totalScoreRange[1]
      ),
    [leaderboardRows, teamName, teamCode, rankRange, totalScoreRange]
  );

  async function handleImport() {
    setImporting(true);
    setImportResult(null);
    try {
      const result = await apiClient.post("/teams/import", {
        content: importContent,
        format: "csv",
        hasHeader: true,
      });
      setImportResult(result);
      fetchTeams();
    } catch (e: any) {
      setImportResult({ success: false, message: e.message });
    } finally {
      setImporting(false);
    }
  }

  function handleExport() {
    const csv = [
      ["Team Number", "Name", "Organization", "Description"],
      ...teams.map((t) => [t.teamNumber, t.name, t.organization || "", t.description || ""]),
    ]
      .map((row) => row.map((v) => `"${(v ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teams.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight mb-1">Teams</h1>
          <p className="text-base text-gray-400">View, import, export, and manage teams</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
            <DownloadIcon size={16} /> Export
          </Button>
          <Button onClick={() => setImporting((v) => !v)} variant="outline" className="flex items-center gap-2">
            <UploadIcon size={16} /> Import
          </Button>
        </div>
      </div>
      {importing && (
        <Card className="mb-6 border border-primary-700 bg-primary-950">
          <CardContent className="py-4">
            <h3 className="font-semibold mb-2 text-primary-200">Import Teams (CSV)</h3>
            <textarea
              className="w-full h-32 p-2 rounded border border-primary-700 bg-primary-900 text-primary-100 mb-2"
              placeholder="Paste CSV content here. Columns: Name, Organization, Description."
              value={importContent}
              onChange={(e) => setImportContent(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleImport} disabled={importing || !importContent}>
                Import
              </Button>
              <Button variant="outline" onClick={() => setImporting(false)}>
                Cancel
              </Button>
            </div>
            {importResult && (
              <div className={`mt-2 text-sm ${importResult.success ? "text-green-400" : "text-red-400"}`}>
                {importResult.message}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {error ? (
        <div className="text-red-400 mb-4">{error}</div>
      ) : loading ? (
        <div className="text-gray-400">Loading teams...</div>
      ) : (
        <LeaderboardTable
          data={filteredRows}
          columns={teamLeaderboardColumns}
          loading={loading}
          filterUI={
            <LeaderboardFilters
              teamName={teamName}
              setTeamName={setTeamName}
              teamCode={teamCode}
              setTeamCode={setTeamCode}
              rankRange={rankRange}
              setRankRange={setRankRange}
              totalScoreRange={totalScoreRange}
              setTotalScoreRange={setTotalScoreRange}
            />
          }
          initialSorting={[{ id: "rank", desc: false }]}
          emptyMessage="No teams found."
        />
      )}
    </div>
  );
}
