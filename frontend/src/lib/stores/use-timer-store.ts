// "use client";

// import { useEffect, useRef, useCallback, useMemo } from "react";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { shallow } from "zustand/shallow";

// export interface TimerState {
//   matchId: string | null;
//   duration: number;
//   remaining: number;
//   isRunning: boolean;
//   lastUpdate: number;
// }

// interface TimerActions {
//   startTimer: (matchId?: string | null) => void;
//   pauseTimer: () => void;
//   resetTimer: (duration?: number) => void;
//   updateMatchId: (matchId: string | null) => void;
//   setElapsedTime: (elapsed: number) => void; // New method to sync with server time
//   tick: () => void; // Internal method for time updates
// }

// export const useTimerStore = create<TimerState & TimerActions>()(
//   persist(
//     (set, get) => ({
//       matchId: null,
//       duration: 150, // 2:30 in seconds
//       remaining: 150,
//       isRunning: false,
//       lastUpdate: Date.now(),

//       startTimer: (matchId) => {
//         // If no matchId is provided, use the current one
//         const currentMatchId = matchId || get().matchId;
//         const { isRunning, matchId: existingMatchId } = get();
        
//         // Only update state if the timer is not running or if the match ID changed
//         if (!isRunning || currentMatchId !== existingMatchId) {
//           set({
//             matchId: currentMatchId,
//             isRunning: true,
//             lastUpdate: Date.now(),
//           });
//         }
//       },

//       pauseTimer: () => {
//         set({
//           isRunning: false,
//         });
//       },

//       resetTimer: (duration = 150) => {
//         set({
//           duration,
//           remaining: duration,
//           isRunning: false,
//           lastUpdate: Date.now(),
//         });
//       },

//       updateMatchId: (matchId) => {
//         const currentMatchId = get().matchId;
        
//         // Only change if match ID is different
//         if (matchId !== currentMatchId) {
//           set({
//             matchId,
//             // Reset timer when changing matches
//             duration: 150,
//             remaining: 150,
//             isRunning: false,
//             lastUpdate: Date.now(),
//           });
//         }
//       },

//       setElapsedTime: (elapsed) => {
//         const { duration } = get();
//         // Calculate remaining time based on elapsed time
//         const remaining = Math.max(0, duration - elapsed);
        
//         set({
//           remaining,
//           lastUpdate: Date.now(),
//           isRunning: remaining > 0, // Auto-start if there's time left
//         });
//       },

//       tick: () => {
//         const state = get();
//         if (state.isRunning && state.remaining > 0) {
//           const now = Date.now();
//           const delta = (now - state.lastUpdate) / 1000;
//           const newRemaining = Math.max(0, state.remaining - delta);
          
//           set({
//             remaining: newRemaining,
//             isRunning: newRemaining > 0,
//             lastUpdate: now,
//           });

//           // Automatically stop timer if it reaches 0
//           if (newRemaining <= 0) {
//             set({ isRunning: false });
//           }
//         }
//       }
//     }),
//     {
//       name: "timer-storage",
//     }
//   )
// );

// // Global interval reference to ensure only one timer is running
// let globalIntervalRef: NodeJS.Timeout | null = null;

// // Setup the timer tick interval outside of React components
// // This prevents re-render loops and ensures only one interval exists
// function setupGlobalTickInterval() {
//   if (globalIntervalRef) return; // Already set up
  
//   // Start global tick interval
//   globalIntervalRef = setInterval(() => {
//     const state = useTimerStore.getState();
//     if (state.isRunning) {
//       useTimerStore.getState().tick();
//     } else if (globalIntervalRef) {
//       // No need to keep ticking if not running
//       clearInterval(globalIntervalRef);
//       globalIntervalRef = null;
//     }
//   }, 100);
  
//   // Clean up on page unload
//   if (typeof window !== 'undefined') {
//     window.addEventListener('beforeunload', () => {
//       if (globalIntervalRef) {
//         clearInterval(globalIntervalRef);
//         globalIntervalRef = null;
//       }
//     });
//   }
// }

// // This hook sets up the timer subscription but doesn't cause renders
// export function useTimerTick() {
//   useEffect(() => {
//     // Set up the subscription to watch for isRunning changes
//     const unsubscribe = useTimerStore.subscribe((state) => {
//       if (state.isRunning && !globalIntervalRef) {
//         setupGlobalTickInterval();
//       }
//     });
    
//     // Initialize the interval if the timer is already running
//     if (useTimerStore.getState().isRunning && !globalIntervalRef) {
//       setupGlobalTickInterval();
//     }
    
//     return unsubscribe;
//   }, []);
// }

// // Utility hook to format time as MM:SS
// export function useFormattedTime() {
//   const remaining = useTimerStore((state) => state.remaining);
  
//   const minutes = Math.floor(remaining / 60);
//   const seconds = Math.floor(remaining % 60);
  
//   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// }

// // For convenience, provides access to the timer store actions and state via selectors
// // to prevent unnecessary re-renders
// export function useTimer() {
//   // Initialize the ticker effect without causing renders
//   useTimerTick();
  
//   // Use individual selectors with primitive values to avoid object recreation
//   const matchId = useTimerStore(state => state.matchId);
//   const duration = useTimerStore(state => state.duration);
//   const remaining = useTimerStore(state => state.remaining);
//   const isRunning = useTimerStore(state => state.isRunning);
  
//   // Create stable references to actions
//   const startTimer = useTimerStore(state => state.startTimer);
//   const pauseTimer = useTimerStore(state => state.pauseTimer);
//   const resetTimer = useTimerStore(state => state.resetTimer);
//   const updateMatchId = useTimerStore(state => state.updateMatchId);
//   const setElapsedTime = useTimerStore(state => state.setElapsedTime);
  
//   // Use useMemo to cache the returned object to prevent unnecessary re-renders
//   return useMemo(() => ({
//     matchId,
//     duration,
//     remaining,
//     isRunning,
//     startTimer,
//     pauseTimer,
//     resetTimer,
//     updateMatchId,
//     setElapsedTime
//   }), [
//     matchId, 
//     duration, 
//     remaining, 
//     isRunning, 
//     startTimer, 
//     pauseTimer, 
//     resetTimer, 
//     updateMatchId,
//     setElapsedTime
//   ]);
// }