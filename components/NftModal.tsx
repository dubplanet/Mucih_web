"use client";
 // NftModal.tsx  (inside component)
export default function NftModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-slate-900 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">Close</button>
      </div>
    </div>
  );
}