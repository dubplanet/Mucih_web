"use client";
import { useState } from "react";
import NftModal from "./NftModal";

interface Props {
  isNight: boolean;
}

export default function ArtOrbs({ isNight }: Props) {
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  // positions (percentages)
  const orbs = [
    { title: "Lofi Sunset", left: 30, top: 40 },
    { title: "Reggae Wave", left: 70, top: 35 },
    { title: "Island Dream", left: 50, top: 20 },
  ];

  return (
    <>
      {orbs.map((o, idx) => (
        <button
          key={idx}
          onClick={() => setModalTitle(o.title)}
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
      {modalTitle && <NftModal title={modalTitle} onClose={() => setModalTitle(null)} />}
    </>
  );
}