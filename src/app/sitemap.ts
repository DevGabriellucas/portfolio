import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projetos/adm4all`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteUrl}/projetos/ecohub`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
