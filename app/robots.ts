import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Gera /robots.txt em build. Não crie public/robots.txt — os dois
// conflitariam e o arquivo estático venceria.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Buscadores tradicionais (Google, Bing, DuckDuckGo, Yandex...)
        userAgent: '*',
        allow: '/',
        // NÃO bloqueie /_next/ — o site é renderizado no cliente e o
        // Google precisa baixar o JS/CSS para enxergar o conteúdo.
        disallow: [
          '/api/',
          '/*?success=true', // contato pós-envio (conteúdo duplicado)
        ],
      },
      {
        // Crawlers de IA / motores de resposta (AEO) — liberados de propósito.
        // Remova um user-agent daqui para bloquear aquele bot específico.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'Bingbot',
          'CCBot',
          'meta-externalagent',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
