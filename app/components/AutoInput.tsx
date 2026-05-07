"use client";
import { useAutocomplete } from "@/app/lib/useAutocomplete";

interface Props {
  placeholder: string;
  type: "airport" | "city";
  value: string;
  onChange: (v: string) => void;
  onSelect: (label: string, code: string) => void;
  className?: string;
}

export default function AutoInput({ placeholder, type, value, onChange, onSelect, className }: Props) {
  const ac = useAutocomplete(type);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); ac.search(e.target.value); }}
        onFocus={() => ac.results.length > 0 && ac.setShow(true)}
        onBlur={() => setTimeout(() => ac.setShow(false), 200)}
        className={className || "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-[15px] bg-white"}
      />
      {ac.show && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl">
          {ac.results.map((r, i) => (
            <div
              key={i}
              onMouseDown={() => { onSelect(r.label, r.code); ac.setShow(false); }}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-gray-100 last:border-0"
            >
              <span className="text-gray-800 text-sm">{r.label}</span>
              <span className="text-blue-600 text-xs font-mono">{r.sub}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
