 "use client";
import { Suspense } from "react";
import dynamic from 'next/dynamic'; 
import AudioPlayer from "@/components/AudioPlayer";
import ScrollCTA from "@/components/ScrollCTA";
import AboutSection from "@/components/AboutSection";

 
const IslandScene = dynamic(() => import("@/components/IslandScene"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
      Loading Mucih Island...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen w-screen bg-black overflow-x-hidden">
      {/* Hero island */}
      <section className="h-screen w-screen">
        <IslandScene />
        <AudioPlayer />
        <ScrollCTA />
      </section>

      {/* Scroll-reveal about */}
      <AboutSection />
    </main>
  );
}