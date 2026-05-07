// Partner affiliate IDs and links
export const PARTNERS = {
  travelpayouts: {
    marker: "525753",
    token: "16d7ec9bece341a8215923ee5188c63d",
  },
  gyg: { id: "5RHBGN7" },
  trip: { alliance: "8192276", sid: "309639758" },
  omio: {
    pub: "7271483",
    campaign: "409973",
    program: "7385",
    base: "https://omio.sjv.io/c/7271483/409973/7385",
  },
  discovercars: { id: "IanKon" },
};

// Generate affiliate links
export function flightLink(from: string, to: string, date: string, lang: string) {
  if (lang === "ru" || lang === "be") {
    const dd = date ? date.slice(8, 10) + date.slice(5, 7) : "";
    return `https://www.aviasales.ru/search/${from}${dd}${to}1?marker=${PARTNERS.travelpayouts.marker}`;
  }
  let link = `https://www.trip.com/flights/?dcity=${from}&acity=${to}`;
  if (date) link += `&ddate=${date}`;
  link += `&Allianceid=${PARTNERS.trip.alliance}&SID=${PARTNERS.trip.sid}`;
  return link;
}

export function omioLink(from: string, to: string) {
  const f = from.toLowerCase().replace(/ /g, "-");
  const t = to.toLowerCase().replace(/ /g, "-");
  return `${PARTNERS.omio.base}?u=https%3A%2F%2Fwww.omio.com%2Ftravel%2F${f}%2F${t}`;
}

export function hotelLink(city: string, checkin: string, checkout: string) {
  return `https://search.hotellook.com/hotels?destination=${encodeURIComponent(city)}&checkIn=${checkin}&checkOut=${checkout}&currency=eur&marker=${PARTNERS.travelpayouts.marker}`;
}

export function tripHotelLink(city: string) {
  return `https://www.trip.com/hotels/?city=0&optionName=${encodeURIComponent(city)}&Allianceid=${PARTNERS.trip.alliance}&SID=${PARTNERS.trip.sid}`;
}

export function tourLink(city: string, lang: string) {
  const localeMap: Record<string, string> = { ru: "ru", en: "en", de: "de", fr: "fr", es: "es", it: "it", pt: "pt" };
  const locale = localeMap[lang] || "en";
  return `https://www.getyourguide.com/s/?q=${encodeURIComponent(city)}&locale=${locale}&partner_id=${PARTNERS.gyg.id}&utm_medium=online_publisher`;
}

export function carLink(city: string) {
  const slug = city.toLowerCase().replace(/ /g, "-");
  return `https://www.discovercars.com/${slug}?a_aid=${PARTNERS.discovercars.id}`;
}

export function esimLink() {
  return `https://www.yesim.app/?marker=${PARTNERS.travelpayouts.marker}`;
}

export function insuranceLink(lang: string) {
  if (["ru", "be", "uk"].includes(lang)) {
    return `https://cherehapa.ru/?marker=${PARTNERS.travelpayouts.marker}`;
  }
  return "https://www.worldnomads.com/";
}
