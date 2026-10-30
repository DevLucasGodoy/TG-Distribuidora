import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { ListaOrcamentoProvider } from '@/components/loja/ListaOrcamento';
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  jsonLdGraph,
  organizationSchema,
  websiteSchema,
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

const TITLE = 'TG Distribuidora | Segurança Eletrônica em Mato Grosso do Sul';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Páginas internas viram "Produtos | TG Distribuidora"
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Segurança Eletrônica',
  keywords: [
    'distribuidora de segurança eletrônica',
    'CFTV Mato Grosso do Sul',
    'câmeras de segurança Dourados',
    'alarmes Campo Grande',
    'controle de acesso MS',
    'automatização de portões',
    'revenda Hikvision',
    'revenda Intelbras',
    'revenda Dahua',
    'energia solar MS',
    'TG Distribuidora',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TG Distribuidora — segurança eletrônica em Mato Grosso do Sul',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  // Preencha NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION com o código do
  // Google Search Console (método "tag HTML") para validar o domínio.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-[#fbf9f8] text-[#1b1c1c]">
        {/* Dados estruturados globais: identidade da empresa + site.
            Lidos por Google (rich results) e por assistentes de IA. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdGraph([organizationSchema, websiteSchema]),
          }}
        />
        <ListaOrcamentoProvider>{children}</ListaOrcamentoProvider>
      </body>
    </html>
  );
}
