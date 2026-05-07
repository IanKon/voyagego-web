"use client";
import { useState, useRef, useCallback } from "react";

interface ACResult {
  label: string;
  code: string;
  sub: string;
}

export function useAutocomplete(type: "airport" | "city" = "airport") {
  const [results, setResults] = useState<ACResult[]>([]);
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((q: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (q.length < 2) { setShow(false); setResults([]); return; }

    timer.current = setTimeout(async () => {
      try {
        let data: ACResult[] = [];
        if (type === "airport") {
          const r = await fetch(
            `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(q)}&locale=en&types[]=city&types[]=airport`
          );
          const json = await r.json();
          data = json.slice(0, 6).map((d: any) => ({
            label: `${d.name}${d.country_name ? ", " + d.country_name : ""}`,
            code: d.code || "",
            sub: d.code || "",
          }));
        } else {
          const r = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=6&lang=en`
          );
          const geo = await r.json();
          data = (geo.features || []).map((f: any) => ({
            label: `${f.properties.name}${f.properties.country ? ", " + f.properties.country : ""}`,
            code: f.properties.name || "",
            sub: f.properties.country || "",
          }));
        }
        setResults(data);
        setShow(data.length > 0);
      } catch {
        setShow(false);
      }
    }, 300);
  }, [type]);

  return { results, show, setShow, search };
}
