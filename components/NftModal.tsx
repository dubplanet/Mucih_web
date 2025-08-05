"use client";
export default function NftModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-xl p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>NFT Preview</h2>
        <button onClick={onClose} className="mt-4">Close</button>
      </div>
    </div>
  );
}