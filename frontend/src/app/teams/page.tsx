"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  const [importError, setImportError] = useState<string | null>(null);

  // State for leaderboard filters
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [rankRange, setRankRange] = useState<[number, number]>([1, 100]);
  const [totalScoreRange, setTotalScoreRange] = useState<[number, number]>([0, 1000]);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !workerRef.current) {
      workerRef.current = new Worker(new URL('./parseCsv.worker.ts', import.meta.url));
      workerRef.current.onmessage = (e: MessageEvent) => {
        if (e.data.error) {
          setImportError(e.data.error);
        } else if (e.data.csv) {
          setImportContent(e.data.csv);
          setImportError(null);
        }
      };
    }
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
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
        <Card className="mb-6 border-2 border-blue-700 bg-gradient-to-br from-blue-950 to-blue-900 shadow-xl">
          <CardContent className="py-6">
            <div className="flex items-center gap-2 mb-4">
              <UploadIcon size={22} className="text-blue-400" />
              <h3 className="font-bold text-lg text-blue-200 tracking-wide">Import Teams from CSV</h3>
            </div>
            <div className="mb-4 text-blue-100 text-sm">
              <span className="font-semibold text-blue-300">Instructions:</span> Upload a <span className="font-mono bg-blue-800/60 px-1 rounded">.csv</span> file or paste CSV content below.<br/>
              <span className="text-blue-300">Columns:</span> <span className="font-mono bg-blue-800/60 px-1 rounded">Name</span>, <span className="font-mono bg-blue-800/60 px-1 rounded">Organization</span>, <span className="font-mono bg-blue-800/60 px-1 rounded">Description</span>
            </div>
            <label className="block mb-2 font-semibold text-blue-300">Upload CSV File</label>
            <input
              type="file"
              accept=".csv"
              className="mb-4 block w-full text-sm text-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-800/80 file:text-blue-200 hover:file:bg-blue-700/80"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                if (workerRef.current) {
                  workerRef.current.postMessage({ csvText: text });
                } else {
                  setImportContent(text);
                }
              }}
            />
            <label className="block mb-2 font-semibold text-blue-300 mt-4">Or Paste CSV Content</label>
            <textarea
              className="w-full h-32 p-2 rounded border border-blue-700 bg-blue-950 text-blue-100 mb-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Paste CSV content here. Columns: Name, Organization, Description."
              value={importContent}
              onChange={(e) => setImportContent(e.target.value)}
            />
            {importError && (
              <div className="text-red-400 text-sm mb-2 font-semibold border-l-4 border-red-500 pl-2 bg-red-950/60 py-1">{importError}</div>
            )}
            {/* Preview first 3 rows if available */}
            {importContent && (
              <div className="bg-blue-900/80 text-blue-100 rounded p-3 mb-3 text-xs border border-blue-700">
                <div className="font-bold mb-1 text-blue-300">Preview:</div>
                {importContent.split('\n').slice(0, 3).map((row, i) => (
                  <div key={i} className="font-mono text-blue-200">{row}</div>
                ))}
                {importContent.split('\n').length > 3 && <div className="text-blue-400">...</div>}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button onClick={handleImport} disabled={importing || !importContent} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-lg shadow">
                <UploadIcon size={16} className="mr-2" /> Import
              </Button>
              <Button variant="outline" onClick={() => setImporting(false)} className="border-blue-700 text-blue-200 hover:bg-blue-800/30">
                Cancel
              </Button>
            </div>
            {importResult && (
              <div className={`mt-4 text-sm font-semibold px-3 py-2 rounded ${importResult.success ? "bg-green-900/80 text-green-300 border-l-4 border-green-500" : "bg-red-900/80 text-red-300 border-l-4 border-red-500"}`}>
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
