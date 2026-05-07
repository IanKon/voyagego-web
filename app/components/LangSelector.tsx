"use client";
import { useState, useRef, useEffect } from "react";
import { LANGS } from "@/app/lib/i18n";

interface Props {
  lang: string;
  onChangeLang: (code: string) => void;
  dark?: boolean;
}

export default function LangSelector({ lang, onChangeLang, dark = false }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const info = LANGS[lang] || LANGS.en;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition ${
          dark
            ? "border border-white/40 text-white/90 hover:bg-white/10"
            : "border border-gray-200 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <span>{info.flag}</span>
        <span>{lang.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden min-w-[160px] z-50 max-h-[400px] overflow-y-auto">
          {Object.entries(LANGS).map(([code, info]) => (
            <div
              key={code}
              onClick={() => { onChangeLang(code); setOpen(false); }}
              className={`px-4 py-2.5 cursor-pointer text-sm flex items-center gap-2 hover:bg-blue-50 transition ${
                lang === code ? "text-blue-600 bg-blue-50/50" : "text-gray-800"
              }`}
            >
              <span>{info.flag}</span>
              <span>{info.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
