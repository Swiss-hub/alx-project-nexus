import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-gray-800 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-2 md:mb-0">
          <span className="font-bold text-primary">MovieApp</span> &copy; {new Date().getFullYear()} &mdash; Built by Swiss-hub
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/Swiss-hub" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">GitHub</a>
          <a href="https://flowbite-react.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Flowbite</a>
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Tailwind CSS</a>
        </div>
      </div>
    </footer>
  );
}
