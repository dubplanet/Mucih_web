"use client";
import Image from 'next/image';

interface Props { orb: { id: number; title: string; artwork: string }; onClose: () => void }
export default function NftModal({ orb, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="bg-slate-900 rounded-2xl p-6 max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl text-white mb-2">{orb.title}</h2>
        <Image 
          src={orb.artwork} 
          alt={orb.title} 
          width={256}
          height={256}
          className="w-full rounded mb-4" 
        />
        <button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded py-2">Mint NFT</button>
        <button onClick={onClose} className="w-full mt-2 text-gray-400 hover:text-white">Close</button>
      </div>
    </div>
  );
}