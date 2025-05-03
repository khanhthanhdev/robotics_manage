import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the audience display settings type
export type AudienceDisplaySettings = {
  displayMode: string;
  matchId?: string | null;
  showTimer?: boolean;
  showScores?: boolean;
  showTeams?: boolean;
  message?: string;
  timerStartedAt?: number | null; // Timestamp when timer was started
  updatedAt: number;
};

// Default settings
const DEFAULT_SETTINGS: AudienceDisplaySettings = {
  displayMode: "intro",
  showTimer: true,
  showScores: true,
  showTeams: true,
  timerStartedAt: null,
  updatedAt: Date.now(),
};

/**
 * Hook to get the current audience display settings
 */
export function useAudienceDisplaySettings() {
  return useQuery({
    queryKey: ["audience-display-settings"],
    queryFn: (): AudienceDisplaySettings => {
      // Get settings from localStorage or use defaults
      const storedSettings = localStorage.getItem("audience-display-settings");
      if (storedSettings) {
        return JSON.parse(storedSettings);
      }
      return DEFAULT_SETTINGS;
    },
    // Refresh settings every 2 seconds to detect changes from other tabs/windows
    refetchInterval: 2000,
  });
}

/**
 * Hook to update audience display settings
 */
export function useUpdateAudienceDisplay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<AudienceDisplaySettings>) => {
      // Get current settings from localStorage
      const storedSettings = localStorage.getItem("audience-display-settings");
      const currentSettings = storedSettings 
        ? JSON.parse(storedSettings) 
        : DEFAULT_SETTINGS;

      // Update settings with new values
      const updatedSettings = {
        ...currentSettings,
        ...settings,
        updatedAt: Date.now(),
      };

      // Save to localStorage
      localStorage.setItem(
        "audience-display-settings",
        JSON.stringify(updatedSettings)
      );

      return updatedSettings;
    },
    onSuccess: (data) => {
      // Update the query cache
      queryClient.setQueryData(["audience-display-settings"], data);
    },
  });
}