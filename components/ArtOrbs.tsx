"use client";
import { useState } from "react";
import ArtOrb from "./ArtOrb";
import NftModal from "./NftModal";

const orbs: readonly [number, number, number][] = [
  [2, 1, 0],
  [-2, 0.5, 1],
  [0, 2, -2],
];

export default function ArtOrbs() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {orbs.map((pos, idx) => (
        <ArtOrb key={idx} position={pos} onClick={() => setModalOpen(true)} />
      ))}
      {modalOpen && <NftModal onClose={() => setModalOpen(false)} />}
    </>
  );
}