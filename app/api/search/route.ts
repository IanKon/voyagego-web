import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.voyagego.world"; // Will point to Hetzner server

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || "";
  const dest = searchParams.get("dest") || "";
  const date = searchParams.get("date") || "";
  const return_date = searchParams.get("return_date") || "";
  const lang = searchParams.get("lang") || "en";

  try {
    let url = `${API_BASE}/api/search-return?origin=${origin}&dest=${dest}&date=${date}&lang=${lang}`;
    if (return_date) url += `&return_date=${return_date}`;

    const res = await fetch(url, { next: { revalidate: 300 } }); // Cache 5 min
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ outbound: [], return: [], outbound_count: 0, return_count: 0 }, { status: 500 });
  }
}
