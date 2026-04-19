import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-headline',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tgdistribuidora.com.br';

export const metadata: Metadata = {
  title: 'TG Distribuidora | Segurança Eletrônica em MS',
  description: 'A maior distribuidora de tecnologia em segurança de Mato Grosso do Sul.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'TG Distribuidora | Segurança Eletrônica em MS',
    description: 'A maior distribuidora de tecnologia em segurança de Mato Grosso do Sul.',
    url: siteUrl,
    siteName: 'TG Distribuidora',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TG Distribuidora',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TG Distribuidora | Segurança Eletrônica em MS',
    description: 'A maior distribuidora de tecnologia em segurança de Mato Grosso do Sul.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-[#fbf9f8] text-[#1b1c1c]">
        {children}
      </body>
    </html>
  );
}
