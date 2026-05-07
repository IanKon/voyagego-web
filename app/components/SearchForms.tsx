"use client";
import { useState, useEffect } from "react";
import AutoInput from "./AutoInput";
import { flightLink, omioLink, hotelLink, tripHotelLink, tourLink, carLink } from "@/app/lib/partners";

function defaultDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function FlightForm({ lang, t }: { lang: string; t: (k: string) => string }) {
  const [from, setFrom] = useState(""); const [fromCode, setFromCode] = useState("");
  const [to, setTo] = useState(""); const [toCode, setToCode] = useState("");
  const [date, setDate] = useState(""); const [ret, setRet] = useState("");

  useEffect(() => { setDate(defaultDate(30)); setRet(defaultDate(37)); }, []);

  const doSearch = () => {
    if (!from || !to) return;
    const fc = fromCode || from.slice(0, 3).toUpperCase();
    const tc = toCode || to.slice(0, 3).toUpperCase();
    window.open(flightLink(fc, tc, date, lang), "_blank");
  };

  return (
    <div className="p-5 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("from")}</label>
          <AutoInput placeholder="London, Paris..." type="airport" value={from} onChange={setFrom} onSelect={(v, c) => { setFrom(v); setFromCode(c); }} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("to")}</label>
          <AutoInput placeholder="New York, Tokyo..." type="airport" value={to} onChange={setTo} onSelect={(v, c) => { setTo(v); setToCode(c); }} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("date")}</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-[15px]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("return_date")}</label>
          <input type="date" value={ret} onChange={e => setRet(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-[15px]" />
        </div>
        <div className="col-span-2 md:col-span-1 flex items-end">
          <button onClick={doSearch}
            className="w-full bg-[#1A2332] hover:bg-[#2D3848] text-white font-semibold py-3.5 rounded-xl transition-all text-[15px] cursor-pointer">
            {t("search")} ✈️
          </button>
        </div>
      </div>
    </div>
  );
}

export function TrainForm({ lang, t }: { lang: string; t: (k: string) => string }) {
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const doSearch = () => {
    if (!from || !to) return;
    window.open(omioLink(from.split(",")[0], to.split(",")[0]), "_blank");
  };
  return (
    <div className="p-5 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("from")}</label>
          <AutoInput placeholder="Lisbon, Madrid..." type="city" value={from} onChange={setFrom} onSelect={(v) => setFrom(v)} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("to")}</label>
          <AutoInput placeholder="Porto, Barcelona..." type="city" value={to} onChange={setTo} onSelect={(v) => setTo(v)} />
        </div>
      </div>
      <button onClick={doSearch}
        className="w-full bg-[#1A2332] hover:bg-[#2D3848] text-white font-semibold py-3.5 rounded-xl transition-all text-[15px] cursor-pointer">
        {t("search")} 🚂
      </button>
    </div>
  );
}

export function HotelForm({ lang, t }: { lang: string; t: (k: string) => string }) {
  const [city, setCity] = useState("");
  const [ci, setCi] = useState(""); const [co, setCo] = useState("");
  useEffect(() => { setCi(defaultDate(30)); setCo(defaultDate(33)); }, []);
  const doSearch = () => {
    if (!city) return;
    window.open(hotelLink(city.split(",")[0], ci, co), "_blank");
  };
  return (
    <div className="p-5 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("city")}</label>
          <AutoInput placeholder="Paris, Rome..." type="city" value={city} onChange={setCity} onSelect={(v) => setCity(v)} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("checkin")}</label>
          <input type="date" value={ci} onChange={e => setCi(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-[15px]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("checkout")}</label>
          <input type="date" value={co} onChange={e => setCo(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition text-[15px]" />
        </div>
      </div>
      <button onClick={doSearch}
        className="w-full bg-[#1A2332] hover:bg-[#2D3848] text-white font-semibold py-3.5 rounded-xl transition-all text-[15px] cursor-pointer">
        {t("search")} 🏨
      </button>
    </div>
  );
}

export function TourForm({ lang, t }: { lang: string; t: (k: string) => string }) {
  const [city, setCity] = useState("");
  const doSearch = () => {
    if (!city) return;
    window.open(tourLink(city.split(",")[0], lang), "_blank");
  };
  return (
    <div className="p-5 space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("city")}</label>
        <AutoInput placeholder="Paris, Barcelona, Kyoto..." type="city" value={city} onChange={setCity} onSelect={(v) => setCity(v)} />
      </div>
      <button onClick={doSearch}
        className="w-full bg-[#1A2332] hover:bg-[#2D3848] text-white font-semibold py-3.5 rounded-xl transition-all text-[15px] cursor-pointer">
        {t("search")} 🎭
      </button>
    </div>
  );
}

export function CarForm({ lang, t }: { lang: string; t: (k: string) => string }) {
  const [city, setCity] = useState("");
  const doSearch = () => {
    if (!city) return;
    window.open(carLink(city.split(",")[0]), "_blank");
  };
  return (
    <div className="p-5 space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">{t("pickup")}</label>
        <AutoInput placeholder="Lisbon, Barcelona..." type="city" value={city} onChange={setCity} onSelect={(v) => setCity(v)} />
      </div>
      <button onClick={doSearch}
        className="w-full bg-[#1A2332] hover:bg-[#2D3848] text-white font-semibold py-3.5 rounded-xl transition-all text-[15px] cursor-pointer">
        {t("search")} 🚗
      </button>
    </div>
  );
}
