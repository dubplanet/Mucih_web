 "use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import AudioPlayer from "@/components/AudioPlayer";

const Island = dynamic(() => import("@/components/IslandScene"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
      Loading Mucih world…
    </div>
  ),
});

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black overflow-hidden">
      <Suspense fallback={null}>
        <Island />
      </Suspense>
      <AudioPlayer />   {/* ← add this line */}
    </main>
  );
}
 