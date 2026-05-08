import { MetadataRoute } from "next";

const popularRoutes = [
  "lisbon-to-paris", "lisbon-to-london", "lisbon-to-madrid", "lisbon-to-barcelona",
  "lisbon-to-rome", "lisbon-to-amsterdam", "lisbon-to-berlin", "lisbon-to-porto",
  "london-to-paris", "london-to-amsterdam", "london-to-barcelona", "london-to-rome",
  "london-to-berlin", "london-to-dublin", "london-to-lisbon", "london-to-madrid",
  "paris-to-london", "paris-to-rome", "paris-to-barcelona", "paris-to-amsterdam",
  "paris-to-berlin", "paris-to-lisbon", "paris-to-madrid", "paris-to-milan",
  "madrid-to-barcelona", "madrid-to-lisbon", "madrid-to-paris", "madrid-to-london",
  "rome-to-milan", "rome-to-paris", "rome-to-london", "rome-to-barcelona",
  "amsterdam-to-london", "amsterdam-to-paris", "amsterdam-to-berlin", "amsterdam-to-barcelona",
  "berlin-to-paris", "berlin-to-london", "berlin-to-amsterdam", "berlin-to-rome",
  "barcelona-to-madrid", "barcelona-to-paris", "barcelona-to-london", "barcelona-to-rome",
  "milan-to-rome", "milan-to-paris", "milan-to-london", "milan-to-barcelona",
  "dubai-to-london", "dubai-to-paris", "new-york-to-london", "new-york-to-paris",
  "tokyo-to-london", "tokyo-to-paris", "istanbul-to-london", "istanbul-to-paris",
  "athens-to-rome", "athens-to-paris", "athens-to-london", "athens-to-barcelona",
  "vienna-to-paris", "vienna-to-london", "vienna-to-rome", "vienna-to-berlin",
  "prague-to-london", "prague-to-paris", "prague-to-berlin", "prague-to-vienna",
  "budapest-to-vienna", "budapest-to-berlin", "budapest-to-paris", "budapest-to-london",
  "warsaw-to-london", "warsaw-to-paris", "warsaw-to-berlin", "warsaw-to-rome",
  "dublin-to-london", "dublin-to-paris", "dublin-to-amsterdam", "dublin-to-barcelona",
  // More routes from Omio database will be added here via script
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = popularRoutes.map(route => ({
    url: `https://voyagego.world/flights/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://voyagego.world",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...routes,
  ];
}
