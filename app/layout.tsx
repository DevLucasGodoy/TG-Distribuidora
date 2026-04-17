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

export const metadata: Metadata = {
  title: 'TG Distribuidora | Segurança Eletrônica em MS',
  description: 'A maior distribuidora de tecnologia em segurança de Mato Grosso do Sul.',
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
