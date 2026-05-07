import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoyageGo — Flights, Hotels, Tours, Cars | Travel Search",
  description: "Compare flights, trains, buses, hotels, tours and car rental worldwide. 20 languages, best prices from multiple providers.",
  keywords: "flights, hotels, trains, buses, car rental, travel, cheap tickets, Omio, Trip.com",
  openGraph: {
    title: "VoyageGo — Travel Search",
    description: "Compare flights, trains, buses, hotels, tours and car rental worldwide.",
    url: "https://voyagego.world",
    siteName: "VoyageGo",
    type: "website",
  },
};

const PARTNERS = {
  travelpayouts: { marker: "525753" },
  gyg: { id: "5RHBGN7" },
  trip: { alliance: "8192276", sid: "309639758" },
  omio: { link: "https://omio.sjv.io/c/7271483/409973/7385" },
  discovercars: { id: "IanKon" },
};

function HeroSearch() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0e1a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1628] via-[#0a0e1a] to-[#141e38]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2a4fff]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6c3aff]/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-white">Voyage</span>
            <span className="text-[#5b7fff]">Go</span>
          </h1>
          <p className="mt-3 text-[#8888a0] text-lg md:text-xl font-light tracking-wide">
            Flights · Trains · Hotels · Tours · Cars
          </p>
        </div>

        {/* Search Card */}
        <div className="mt-10 bg-[#141825]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-[#8888a0] mb-2 tracking-widest uppercase">From</label>
              <input
                type="text"
                placeholder="City or airport"
                className="w-full bg-[#0d1120] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-[#555] focus:border-[#5b7fff]/50 focus:outline-none transition-colors text-sm"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-[#8888a0] mb-2 tracking-widest uppercase">To</label>
              <input
                type="text"
                placeholder="City or airport"
                className="w-full bg-[#0d1120] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-[#555] focus:border-[#5b7fff]/50 focus:outline-none transition-colors text-sm"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-[#8888a0] mb-2 tracking-widest uppercase">Date</label>
              <input
                type="date"
                className="w-full bg-[#0d1120] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:border-[#5b7fff]/50 focus:outline-none transition-colors text-sm [color-scheme:dark]"
              />
            </div>
            <div className="md:col-span-1 flex items-end">
              <a
                href={`https://www.aviasales.ru/?marker=${PARTNERS.travelpayouts.marker}`}
                target="_blank"
                rel="noopener"
                className="w-full bg-[#5b7fff] hover:bg-[#4a6bff] text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:shadow-[0_0_24px_rgba(91,127,255,0.3)] text-sm text-center block"
              >
                Search flights
              </a>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { icon: "✈️", label: "Flights", href: `https://www.aviasales.ru/?marker=${PARTNERS.travelpayouts.marker}` },
            { icon: "🚂", label: "Trains", href: PARTNERS.omio.link },
            { icon: "🏨", label: "Hotels", href: `https://search.hotellook.com/?marker=${PARTNERS.travelpayouts.marker}` },
            { icon: "🎭", label: "Tours", href: `https://www.getyourguide.com/?partner_id=${PARTNERS.gyg.id}` },
            { icon: "🚗", label: "Cars", href: `https://www.discovercars.com/?a_aid=${PARTNERS.discovercars.id}` },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-full px-5 py-2.5 text-sm text-[#c0c0d0] hover:text-white transition-all"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Telegram bot link */}
        <div className="mt-12">
          <a
            href="https://t.me/VoyageGoBot"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20 border border-[#2AABEE]/20 rounded-full px-6 py-3 text-[#2AABEE] transition-all group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="font-medium text-sm">Use our Telegram Bot for instant search</span>
            <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">@VoyageGoBot</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const services = [
    {
      icon: "✈️",
      title: "Flights",
      desc: "Compare prices across airlines. Smart hub routing finds cheaper connections.",
      link: `https://www.aviasales.ru/?marker=${PARTNERS.travelpayouts.marker}`,
      cta: "Search flights",
    },
    {
      icon: "🚂",
      title: "Trains & Buses",
      desc: "13,000+ routes across Europe, USA, Canada and Japan. Real prices from Omio.",
      link: PARTNERS.omio.link,
      cta: "Find trains",
    },
    {
      icon: "🏨",
      title: "Hotels",
      desc: "Best hotel prices from multiple booking platforms compared in one place.",
      link: `https://search.hotellook.com/?marker=${PARTNERS.travelpayouts.marker}`,
      cta: "Compare hotels",
    },
    {
      icon: "🎭",
      title: "Tours & Activities",
      desc: "Skip-the-line tickets, guided tours, unique experiences worldwide.",
      link: `https://www.getyourguide.com/?partner_id=${PARTNERS.gyg.id}`,
      cta: "Explore tours",
    },
    {
      icon: "🚗",
      title: "Car Rental",
      desc: "Compare prices from 500+ car rental companies in 145+ countries.",
      link: `https://www.discovercars.com/?a_aid=${PARTNERS.discovercars.id}`,
      cta: "Rent a car",
    },
    {
      icon: "📱",
      title: "Travel eSIM",
      desc: "Stay connected in 150+ countries. No roaming, no SIM swapping.",
      link: `https://www.yesim.app/?marker=${PARTNERS.travelpayouts.marker}`,
      cta: "Get eSIM",
    },
  ];

  return (
    <section className="bg-[#0d1120] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Everything you need to travel
        </h2>
        <p className="text-[#8888a0] text-center mb-16 text-lg">
          One place for flights, trains, hotels, tours and cars
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <a
              key={s.title}
              href={s.link}
              target="_blank"
              rel="noopener"
              className="group bg-[#141825] hover:bg-[#1a1f30] border border-white/[0.04] hover:border-[#5b7fff]/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(91,127,255,0.06)]"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5b7fff] transition-colors">
                {s.title}
              </h3>
              <p className="text-[#8888a0] text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-[#5b7fff] text-sm font-medium">
                {s.cta} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TelegramCTA() {
  return (
    <section className="bg-[#0a0e1a] py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#141825] to-[#1a1f30] border border-white/[0.06] rounded-3xl p-10 md:p-14">
          <div className="text-5xl mb-6">🤖</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Instant search in Telegram
          </h2>
          <p className="text-[#8888a0] mb-8 text-lg leading-relaxed">
            Search flights, compare trains & buses, find hotels — all inside Telegram.
            20 languages, 20 currencies, real prices.
          </p>
          <a
            href="https://t.me/VoyageGoBot"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 bg-[#2AABEE] hover:bg-[#239ED8] text-white font-semibold py-4 px-8 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(42,171,238,0.3)] text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Open @VoyageGoBot
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080b14] border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-xl font-bold text-white">
              Voyage<span className="text-[#5b7fff]">Go</span>
            </span>
            <p className="text-[#555] text-sm mt-1">Flights · Trains · Hotels · Tours · Cars</p>
          </div>
          <div className="flex gap-6">
            <a href="https://t.me/VoyageGoBot" target="_blank" rel="noopener" className="text-[#8888a0] hover:text-white text-sm transition-colors">
              Telegram Bot
            </a>
            <a href="mailto:support@voyagego.world" className="text-[#8888a0] hover:text-white text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-[#444] text-xs">
            © {new Date().getFullYear()} VoyageGo. Prices are approximate and may vary.
            We earn commissions from partner bookings.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSearch />
      <ServicesGrid />
      <TelegramCTA />
      <Footer />
    </main>
  );
}
