"use client";
interface Props { onClose: () => void }
export default function NftModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div className="bg-slate-900 rounded-xl p-6 max-w-sm">
        <h2 className="text-white mb-2">NFT Preview</h2>
        <button onClick={onClose} className="text-gray-400">Close</button>
      </div>
    </div>
  );
} 