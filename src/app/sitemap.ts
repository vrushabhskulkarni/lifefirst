import { MetadataRoute } from "next";
import solutionsData from "@/data/data.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.life-first.in";

  // Last content update per page (YYYY-MM-DD) — update the date when that page's content changes
  const staticPages: { route: string; lastModified: string }[] = [
    { route: "", lastModified: "2026-10-05" },
    { route: "/about-us", lastModified: "2026-10-05" },
    { route: "/solutions", lastModified: "2025-12-08" },
    { route: "/solutions/advanced-filtration-and-treatment", lastModified: "2025-09-13" },
    { route: "/solutions/sanitation", lastModified: "2025-12-08" },
    { route: "/solutions/hydration-monitoring", lastModified: "2025-09-13" },
    { route: "/case-studies", lastModified: "2025-12-21" },
    { route: "/careers", lastModified: "2026-07-20" },
    { route: "/company-brochures", lastModified: "2025-12-29" },
    { route: "/contact", lastModified: "2026-10-05" },
    { route: "/gallery", lastModified: "2026-05-08" },
    { route: "/investors", lastModified: "2026-05-27" },
    { route: "/privacy-policy", lastModified: "2025-09-11" },
    { route: "/lifeflow/privacy", lastModified: "2026-11-19" },
    { route: "/terms-of-use", lastModified: "2025-09-11" },
    { route: "/recognitions", lastModified: "2026-03-25" },
  ];

  // Last content update of the individual solution pages (src/data/data.json)
  const solutionsLastModified = "2025-12-30";

  //Static Routes
  const staticRoutes: MetadataRoute.Sitemap = staticPages.map(({ route, lastModified }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(lastModified),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic solution pages
  const solutionRoutes: MetadataRoute.Sitemap = solutionsData.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified: new Date(solutionsLastModified),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...solutionRoutes];
}
