import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

// Adicionou uma página nova em app/? Registre a rota aqui.
const ROUTES: Route[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/produtos', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/marcas', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contato', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sobre', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/first-class-dev', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
