"use client";
export default function ScrollCTA() {
  return (
    <button
      onClick={() =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
      }
      className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/20 backdrop-blur rounded-xl text-white hover:bg-white/30 transition"
    >
      Enter Mucih
    </button>
  );
}