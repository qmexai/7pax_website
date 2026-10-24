import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://7pax.in', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}