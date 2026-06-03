"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import PortfolioEffects from "@/components/layout/PortfolioEffects";

const SplashScreen = dynamic(() => import("@/components/SplashScreen"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const BackgroundCanvas = dynamic(
  () => import("@/components/BackgroundCanvas"),
  { ssr: false },
);
const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
});

export default function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PortfolioEffects />
      <SplashScreen />
      <CustomCursor />
      <BackgroundCanvas />
      <div className="relative z-[3]">{children}</div>
      <Terminal />
    </>
  );
}
