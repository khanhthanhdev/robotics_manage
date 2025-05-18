// Utility functions for audience display
export function formatTime(ms: number): string {
  if (typeof ms !== "number" || isNaN(ms) || ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function injectTextShadowStyle() {
  if (typeof document !== "undefined") {
    const styleId = "audience-text-shadow-style";
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = `
        .text-shadow-xl {
          text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);
        }
      `;
      document.head.appendChild(styleEl);
    }
  }
}
