// ====================================================================
// SEO / AEO — fonte única de verdade para metadata e dados estruturados
// ====================================================================
// Alterou endereço, telefone ou horário? Altere AQUI. O JSON-LD servido
// para Google, Bing e assistentes de IA (ChatGPT, Gemini, Perplexity)
// é gerado a partir destas constantes.
// ====================================================================

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tgdistribuidora.com.br';

export const SITE_NAME = 'TG Distribuidora';

export const SITE_DESCRIPTION =
  'Distribuidora de segurança eletrônica em Mato Grosso do Sul. CFTV, alarmes, controle de acesso, automatização de portões, cabos e energia solar. Revenda autorizada Hikvision, Intelbras e Dahua com unidades em Dourados, Campo Grande, Ponta Porã e Três Lagoas.';

export const SITE_EMAIL = 'contato@tgdistribuidora.com.br';
export const SITE_PHONE = '+556730323090';

export const SOCIAL_LINKS = [
  'https://www.instagram.com/tg.distribuidora/',
  'https://www.facebook.com/tgdistribuidora/?locale=pt_BR',
  'https://www.linkedin.com/company/tg-distribuidora/?originalSubdomain=br',
];

export type Unit = {
  name: string;
  street: string;
  city: string;
  postalCode?: string;
  phone: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
};

export const UNITS: Unit[] = [
  {
    name: 'TG Distribuidora — Dourados (Matriz)',
    street: 'R. Pedro Rigotti, 925 - Vila Santo André',
    city: 'Dourados',
    phone: '+556730323090',
    lat: -22.2235,
    lng: -54.8064,
    isHQ: true,
  },
  {
    name: 'TG Distribuidora — Campo Grande',
    street: 'Av. Salgado Filho, 1756',
    city: 'Campo Grande',
    phone: '+556730433090',
    lat: -20.4697,
    lng: -54.6201,
  },
  {
    name: 'TG Distribuidora — Ponta Porã',
    street: 'Av. Paraguai, 2310 - Centro',
    city: 'Ponta Porã',
    phone: '+556734316421',
    lat: -22.5361,
    lng: -55.7258,
  },
  {
    name: 'TG Distribuidora — Três Lagoas',
    street: 'R. Darcí Pio, 1333 - Santos Dumont',
    city: 'Três Lagoas',
    phone: '+5567999941447',
    lat: -20.8494,
    lng: -51.7042,
  },
];

// Seg–Sex 07:30–17:30 · Sáb 07:30–11:30
const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:30',
    closes: '17:30',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '07:30',
    closes: '11:30',
  },
];

export const BRANDS = [
  'Hikvision',
  'Intelbras',
  'Dahua',
  'JFL',
  'AGL',
  'IPEC',
  'Garen',
  'Rossi',
  'MPT Cabos',
  'FC Fontes',
  'Inove',
  'Condutti',
  'Continente Motores',
  'Trava Tec',
  'Confiseg',
  'Líder',
  'Movimento',
  'Corteseg',
];

// --- Schema.org builders ---------------------------------------------

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: 'TG Distribuidora de Segurança Eletrônica',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
  },
  image: `${SITE_URL}/og-image.jpg`,
  description: SITE_DESCRIPTION,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  sameAs: SOCIAL_LINKS,
  areaServed: {
    '@type': 'State',
    name: 'Mato Grosso do Sul',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: UNITS[0].street,
    addressLocality: UNITS[0].city,
    addressRegion: 'MS',
    addressCountry: 'BR',
  },
  contactPoint: UNITS.map((u) => ({
    '@type': 'ContactPoint',
    telephone: u.phone,
    contactType: 'sales',
    areaServed: 'BR',
    availableLanguage: ['Portuguese'],
    name: u.name,
  })),
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'pt-BR',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/produtos?brand={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessSchemas = UNITS.map((u) => ({
  '@type': 'ElectronicsStore',
  '@id': `${SITE_URL}/contato#${u.city
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')}`,
  name: u.name,
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  url: `${SITE_URL}/contato`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: u.phone,
  email: SITE_EMAIL,
  priceRange: '$$',
  currenciesAccepted: 'BRL',
  address: {
    '@type': 'PostalAddress',
    streetAddress: u.street,
    addressLocality: u.city,
    addressRegion: 'MS',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: u.lat,
    longitude: u.lng,
  },
  openingHoursSpecification: OPENING_HOURS,
  sameAs: SOCIAL_LINKS,
}));

export function breadcrumbSchema(
  trail: { name: string; path: string }[]
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: 'Início', path: '/' },
      ...trail,
    ].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

/** Monta um bloco @graph pronto para <script type="application/ld+json">. */
export function jsonLdGraph(nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}

// --- FAQ / AEO --------------------------------------------------------
// Cada item aqui aparece DUAS vezes: no acordeão visível de <FaqSection />
// e no JSON-LD FAQPage. É de propósito — o Google penaliza schema de FAQ
// sem o conteúdo correspondente visível na página. Nunca adicione uma
// pergunta ao schema sem que ela apareça na tela.
//
// Todas as respostas abaixo derivam de informação já publicada no site
// (unidades, horários, marcas, categorias). Ao editar, mantenha assim:
// resposta curta, direta e verificável — é isso que assistentes de IA
// (ChatGPT, Gemini, Perplexity) extraem e citam.

export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: 'Onde ficam as unidades da TG Distribuidora?',
    answer: `A TG Distribuidora tem quatro unidades no Mato Grosso do Sul: ${UNITS.map(
      (u) => `${u.city} (${u.street})`
    ).join(
      '; '
    )}. A matriz fica em Dourados e atende todo o cone sul do estado.`,
  },
  {
    question: 'Qual é o horário de atendimento da TG Distribuidora?',
    answer:
      'As unidades atendem de segunda a sexta-feira, das 07:30 às 17:30, e aos sábados das 07:30 às 11:30.',
  },
  {
    question: 'Quais categorias de produtos a TG Distribuidora vende?',
    answer:
      'O catálogo cobre CFTV, alarmes, controle de acesso, automatização de portões, cabos e redes, fontes e energia, além de acessórios de instalação.',
  },
  {
    question: 'Quais marcas a TG Distribuidora representa?',
    answer: `A TG Distribuidora é revenda autorizada de ${BRANDS.slice(0, 10).join(
      ', '
    )}, entre outras marcas do setor de segurança eletrônica.`,
  },
  {
    question: 'A TG Distribuidora trabalha com energia solar?',
    answer:
      'Sim. Além de monitoramento, CFTV e controle de acesso, a TG Distribuidora fornece soluções de energia solar.',
  },
  {
    question: 'Quais regiões a TG Distribuidora atende?',
    answer:
      'A distribuição cobre todo o Mato Grosso do Sul — do cone sul à região de fronteira e à costa leste — e atende instaladores em todo o Centro-Sul do Brasil.',
  },
  {
    question: 'Como faço para me tornar um instalador parceiro?',
    answer:
      'Envie o formulário da página de contato escolhendo o assunto "Nova Parceria", ou fale pelo WhatsApp da unidade mais próxima. A equipe comercial responde em até 24 horas úteis.',
  },
  {
    question: 'Em quanto tempo a TG Distribuidora responde um contato?',
    answer:
      'O prazo de resposta é de até 24 horas úteis para mensagens enviadas pelo formulário do site. Para urgências, ligue para (67) 3032-3090 ou use o WhatsApp da unidade.',
  },
];

export const faqPageSchema = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/contato#faq`,
  inLanguage: 'pt-BR',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
