import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, Space_Mono } from "next/font/google";
import FcdStandardPage from "@/components/FcdStandardPage";

// Fontes da identidade First Class Dev — escopadas a esta página via CSS vars.
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

const fcdDescription =
  "First Class Dev — o estúdio de tecnologia que transforma o seu site em uma máquina de conversão de novos clientes. Sites, SaaS e sistemas sob medida desde 2021.";

export const metadata: Metadata = {
  // `absolute` ignora o template "%s | TG Distribuidora" do layout raiz:
  // esta página tem identidade própria.
  title: { absolute: "First Class Dev | Quem desenvolveu este site" },
  description: fcdDescription,
  alternates: { canonical: "/first-class-dev" },
  openGraph: {
    title: "First Class Dev | Quem desenvolveu este site",
    description: fcdDescription,
    url: "/first-class-dev",
    type: "website",
  },
};

export default function FirstClassDevPage() {
  return (
    <div className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <FcdStandardPage />
    </div>
  );
}
