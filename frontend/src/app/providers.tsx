"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/common/use-auth";
import { MatchProvider } from "@/hooks/context/use-match-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a client for React Query
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Default query options
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
        refetchOnWindowFocus: true,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MatchProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </MatchProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}