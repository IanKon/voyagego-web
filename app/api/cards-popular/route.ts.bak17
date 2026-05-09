import { NextRequest, NextResponse } from "next/server";

// =============================================================================
//  /api/cards-popular?origin=LIS&lang=en&currency=EUR&days=7
//
//  Returns cheapest fares to a CURATED list of popular destinations,
//  departing within the next N days (default 7).
//
//  Difference from /api/cards:
//   - /api/cards = anywhere cheap (Travelpayouts decides destinations)
//   - /api/cards-popular = same 8 famous cities every time, but with real prices
//
//  This is the "Fly somewhere popular next week" section.
// =============================================================================

const TP_TOKEN = process.env.TRAVELPAYOUTS_TOKEN || "16d7ec9bece341a8215923ee5188c63d";
const TP_MARKER = process.env.TRAVELPAYOUTS_MARKER || "525753";
const TRIP_ALLIANCE = "8192276";
const TRIP_SID = "309639758";

// 8 famous bucket-list cities. Same for every origin so users see classics.
// Order matters: top of grid is most iconic.
const POPULAR_CITIES: { code: string; name: string }[] = [
  { code: "CDG", name: "Paris" },
  { code: "FCO", name: "Rome" },
  { code: "BCN", name: "Barcelona" },
  { code: "LHR", name: "London" },
  { code: "AMS", name: "Amsterdam" },
  { code: "HND", name: "Tokyo" },
  { code: "JFK", name: "New York" },
  { code: "DXB", name: "Dubai" },
];

type Card = {
  city: string;
  origin: string;
  destination_code: string;
  link: string;
  tier: "tier1" | "tier2";
  price?: number;
  currency?: string;
  airline?: string;
  departure_date?: string;
};

function buildLink(origin: string, dest: string, date: string, useAviasales: boolean): string {
  // If we don't have an exact date from the API, use today + 14 days as a
  // reasonable "next planning window" default. Without ANY date Trip.com
  // sends users to the /explore world map instead of a real search.
  let effectiveDate = date;
  if (!effectiveDate) {
    const future = new Date();
    future.setDate(future.getDate() + 14);
    effectiveDate = future.toISOString().slice(0, 10);
  }

  if (useAviasales) {
    const dd = effectiveDate.slice(8, 10);
    const mm = effectiveDate.slice(5, 7);
    return `https://www.aviasales.ru/search/${origin}${dd}${mm}${dest}1?marker=${TP_MARKER}`;
  }
  return `https://www.trip.com/flights/?dcity=${origin}&acity=${dest}&ddate=${effectiveDate}&Allianceid=${TRIP_ALLIANCE}&SID=${TRIP_SID}`;
}

// =============================================================================
//  Fetch cheapest fare for one specific route within a date range.
//  Endpoint: v2/prices/latest with depart_date filtering.
// =============================================================================
async function fetchCheapestForRoute(
  origin: string,
  dest: string,
  currency: string,
  daysAhead: number
): Promise<{ price: number; date: string } | null> {
  try {
    // Build window: today through today+daysAhead
    const today = new Date();
    const endDate = new Date(today.getTime() + daysAhead * 86400000);
    const startStr = today.toISOString().slice(0, 10);
    const endStr = endDate.toISOString().slice(0, 10);

    const url = `https://api.travelpayouts.com/v2/prices/latest`
      + `?origin=${origin}&destination=${dest}`
      + `&beginning_of_period=${startStr}`
      + `&period_type=year&one_way=true&page=1&limit=30`
      + `&show_to_affiliates=true&sorting=price&trip_class=0`
      + `&currency=${currency.toLowerCase()}`
      + `&token=${TP_TOKEN}`;

    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) return null;

    const data = await r.json();
    const items: any[] = data.data || [];

    // Filter to dates in our window, then pick cheapest
    const inWindow = items.filter(item => {
      const d = item.depart_date;
      if (!d) return false;
      return d >= startStr && d <= endStr;
    });
    if (inWindow.length === 0) return null;

    inWindow.sort((a, b) => a.value - b.value);
    const cheapest = inWindow[0];

    return {
      price: Math.round(cheapest.value),
      date: cheapest.depart_date,
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const origin = (req.nextUrl.searchParams.get("origin") || "LIS").toUpperCase().slice(0, 3);
  const lang = req.nextUrl.searchParams.get("lang") || "en";
  const currency = (req.nextUrl.searchParams.get("currency") || "EUR").toUpperCase();
  const daysAhead = Math.min(
    Math.max(parseInt(req.nextUrl.searchParams.get("days") || "30", 10) || 30, 1),
    90
  );
  const useAviasales = lang === "ru" || lang === "uk";

  // Fetch all popular cities in parallel
  const results = await Promise.all(
    POPULAR_CITIES
      // Skip if user is already at this city
      .filter(c => c.code !== origin)
      .map(async (city) => {
        const fare = await fetchCheapestForRoute(origin, city.code, currency, daysAhead);

        const card: Card = {
          city: city.name,
          origin,
          destination_code: city.code,
          link: buildLink(origin, city.code, fare?.date || "", useAviasales),
          tier: "tier1",
        };
        if (fare) {
          card.price = fare.price;
          card.currency = currency;
          card.departure_date = fare.date;
        }
        return card;
      })
  );

  // Sort: cards with prices first (cheapest first), cards without prices last
  const sorted = results.sort((a, b) => {
    const aHas = typeof a.price === "number";
    const bHas = typeof b.price === "number";
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;
    if (aHas && bHas) return (a.price || 0) - (b.price || 0);
    return 0;
  });

  return NextResponse.json({
    origin,
    days_ahead: daysAhead,
    cards: sorted,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
