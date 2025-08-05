"use client";
export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">About Mucih</h2>
        <p className="text-lg text-gray-300 mb-8">
          Mucih blends lo-fi hip-hop with reggae vibes, crafting sunsets you can hear and islands you can feel.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-pink-600 rounded-lg hover:bg-pink-700">Mint NFT</button>
          <button className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10">Explore Merch</button>
        </div>
      </div>
    </section>
  );
}