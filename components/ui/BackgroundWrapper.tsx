"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function BackgroundGrid() {
  return (
    <FlickeringGrid
      className="absolute inset-0 z-0 size-full"
      squareSize={4}
      gridGap={6}
      color="#71b1ff"
      maxOpacity={0.3}
      flickerChance={0.3}
    />
  );
}