"use client";
import { useState } from "react";
import NftModal from "./NftModal";

export default function ArtOrbs({ isNight }: { isNight: boolean }) {
  const [open, setOpen] = useState(false);

  // positions as percentages
  const orbs = [
    { id: 1, title: "Lofi Sunset", left: 30, top: 40 },
    { id: 2, title: "Reggae Wave", left: 70, top: 35 },
    { id: 3, title: "Island Dream", left: 50, top: 20 },
  ];
interface Props { isNight: boolean; }

  return (
    <>
      {orbs.map((o) => (
        <button
          key={o.id}
          onClick={() => setOpen(true)}
          className={`absolute w-12 h-12 rounded-full transition-all duration-1000 hover:scale-110 animate-pulse
            ${isNight ? "bg-pink-500/80" : "bg-cyan-500/80"}`}
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 20px ${isNight ? "#ec4899" : "#06b6d4"}`,
          }}
        >
          <span className="sr-only">{o.title}</span>
        </button>
      ))}
      {open && <NftModal onClose={() => setOpen(false)} />}
    </>
  );
}