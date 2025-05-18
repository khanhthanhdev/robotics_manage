import React from "react";

interface LoadingDisplayProps {
  connectionError?: string | null;
}

export const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ connectionError }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold">Loading display...</h2>
      {connectionError && <p className="mt-4 text-red-600">{connectionError}</p>}
    </div>
  </div>
);
