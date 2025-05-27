import React from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, ColumnDef, SortingState } from '@tanstack/react-table';

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

const columns: ColumnDef<Team>[] = [
  {
    accessorKey: 'teamNumber',
    header: () => <span className="text-slate-300">Team #</span>,
    cell: info => {
      const value = info.getValue() as string | undefined;
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm border border-blue-200 shadow-sm">
            {value || '—'}
          </div>
        </div>
      );
    },
    size: 100,
    meta: { responsiveClass: 'pl-6' }, // Add padding for the first cell
  },
  {
    accessorKey: 'name',
    header: () => <span className="text-slate-300">Team Name</span>,
    cell: info => {
      const value = info.getValue() as string | undefined;
      return <div className="text-sm font-medium text-slate-900">{value}</div>;
    },
    size: 220,
    meta: { responsiveClass: '' },
  },
  {
    accessorKey: 'organization',
    header: () => <span className="text-slate-300">Organization</span>,
    cell: info => {
      const value = info.getValue() as string | undefined;
      return <div className="text-sm text-slate-600">{value || '—'}</div>;
    },
    size: 200,
    meta: { responsiveClass: 'hidden md:table-cell' },
  },
  {
    accessorKey: 'location',
    header: () => <span className="text-slate-300">Location</span>,
    cell: info => {
      const value = info.getValue() as string | undefined;
      return <div className="text-sm text-slate-600">{value || '—'}</div>;
    },
    size: 180,
    meta: { responsiveClass: 'hidden lg:table-cell pr-6' }, // Add padding for the last cell
  },
];

export const TeamsDisplay: React.FC<TeamsDisplayProps> = ({ teams, isLoading }) => {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'teamNumber', desc: false }]);

  const table = useReactTable({
    data: teams,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    debugTable: false,
  });

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* Teams Page Header */}
      <div className="bg-slate-800 shadow-lg text-white p-6 md:p-8 rounded-b-xl animate-fade-in">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-center w-full">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">Tournament Teams</h1>
            <p className="text-sm md:text-base text-slate-300 animate-fade-in-slow">
              <span className="text-sky-400 font-semibold">{teams.length}</span> {teams.length === 1 ? 'team' : 'teams'} registered
            </p>
            </div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-md"></span>
            <span className="text-xs text-green-300 font-semibold uppercase">Live</span>
          </div>
        </div>
      </div>

      {/* Teams List Table Area */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full min-h-[300px] bg-white rounded-xl shadow-lg p-8 animate-pulse">
            <div className="text-xl text-slate-500 font-semibold mb-3">Loading teams...</div>
            {/* Simple spinner or loading bar */}
            <div className="w-16 h-16 border-4 border-sky-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : teams.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-700">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${(header.column.columnDef.meta as any)?.responsiveClass || ''} cursor-pointer select-none whitespace-nowrap`}
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: header.getSize() }}
                      >
                        <div className="flex items-center text-slate-300">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="ml-1.5 inline-block w-4 text-center">
                            {header.column.getIsSorted() === 'asc' ? '▲' : header.column.getIsSorted() === 'desc' ? '▼' : <span className="opacity-30">▲</span>}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr key={row.id} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-sky-50/70 transition-colors duration-150`}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className={`px-5 py-4 whitespace-nowrap ${(cell.column.columnDef.meta as any)?.responsiveClass || ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-white rounded-xl shadow-lg p-12 text-center animate-fade-in">
            <svg className="w-16 h-16 text-slate-300 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM12 12.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Teams Available</h3>
            <p className="text-sm text-slate-500">Teams registered for the tournament will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsDisplay;