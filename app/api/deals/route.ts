import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.voyagego.world";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || "LIS";
  const lang = searchParams.get("lang") || "en";

  try {
    const res = await fetch(`${API_BASE}/api/deals?origin=${origin}&lang=${lang}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ deals: [] }, { status: 500 });
  }
}
