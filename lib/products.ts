// ====================================================================
// CATÁLOGO DE PRODUTOS — TG Distribuidora
// ====================================================================
// COMO ADICIONAR UM PRODUTO:
//
// 1. Copie um bloco { ... } da lista `products` e cole no final dela.
// 2. Use um `id` único (continue a sequência numérica).
// 3. `category` precisa ser EXATAMENTE uma das opções de CATEGORIES.
// 4. `brand` aparece no selo do card e no filtro por marca
//    (links vindos da página /marcas usam esse nome).
//
// IMAGENS:
//   • Local (recomendado): salve o arquivo na pasta `public/produtos/`
//     e referencie como  img: "/produtos/nome-do-arquivo.jpg"
//     Tamanho ideal: 800×600px ou maior, JPG/WebP.
//   • Externa: cole a URL completa (https://...). O domínio precisa
//     estar liberado em next.config.ts (images.remotePatterns).
//
// CAMPOS DO POP-UP (opcionais, mas recomendados):
//   • `longDesc`  → descrição completa exibida no pop-up de detalhes.
//   • `features`  → 3 a 5 bullets curtos (diferenciais do produto).
//   • `specs`     → tabela de especificações (rótulo + valor).
// ====================================================================

// --------------------------------------------------------------------
// IMAGEM PROVISÓRIA: todos os produtos fictícios abaixo usam a mesma
// imagem local. Quando tiver as fotos reais:
//   1. Salve cada foto em  public/produtos/  (ex.: camera-speed-dome.jpg)
//   2. No produto, troque  img: PLACEHOLDER_IMG
//      por                 img: "/produtos/camera-speed-dome.jpg"
// --------------------------------------------------------------------
export const PLACEHOLDER_IMG = "/produtos/placeholder.jpg";

// MODELO DE PRODUTO — copie, descomente e preencha:
// {
//   id: 17,                              // próximo número da sequência
//   name: "Nome do Produto",
//   category: "CFTV",                    // uma das opções de CATEGORIES
//   brand: "Marca",
//   desc: "Resumo curto exibido no card (1-2 linhas).",
//   longDesc: "Descrição completa exibida no pop-up de detalhes.",
//   features: [
//     "Diferencial 1",
//     "Diferencial 2",
//     "Diferencial 3",
//   ],
//   specs: [
//     { label: "Garantia", value: "12 meses" },
//     { label: "Voltagem", value: "12V" },
//   ],
//   img: "/produtos/nome-do-arquivo.jpg", // foto em public/produtos/
// },

export const CATEGORIES = [
  "CFTV",
  "Alarmes",
  "Controle de Acesso",
  "Automatização",
  "Cabos e Redes",
  "Fontes e Energia",
  "Acessórios",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: number;
  name: string;
  category: Category;
  brand: string;
  /** Resumo curto exibido no card (1-2 linhas). */
  desc: string;
  /** Descrição completa exibida no pop-up de detalhes. */
  longDesc?: string;
  /** Bullets de diferenciais exibidos no pop-up. */
  features?: string[];
  /** Tabela de especificações exibida no pop-up. */
  specs?: { label: string; value: string }[];
  /** Caminho local ("/produtos/arquivo.jpg") ou URL externa. */
  img: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Câmera IP Speed Dome Ultra",
    category: "CFTV",
    brand: "Hikvision",
    desc: "Câmeras IP com zoom óptico 32x, visão noturna laser e rastreamento inteligente com IA.",
    longDesc:
      "Speed Dome profissional para monitoramento de grandes perímetros. Combina zoom óptico de longo alcance, visão noturna a laser e algoritmos de IA para rastreamento automático de pessoas e veículos, ideal para condomínios, indústrias e áreas urbanas.",
    features: [
      "Zoom óptico 32x com foco automático",
      "Visão noturna laser de longo alcance",
      "Rastreamento inteligente com IA (auto-tracking)",
      "Proteção contra intempéries para uso externo",
    ],
    // Exemplo de tabela de especificações (opcional):
    specs: [
      { label: "Zoom", value: "32x óptico" },
      { label: "Instalação", value: "Interna / Externa" },
      { label: "Garantia", value: "Nacional, com suporte TG" },
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 2,
    name: "Gravador NVR 32 Canais",
    category: "CFTV",
    brand: "Hikvision",
    desc: "Suporte a resolução 4K, reconhecimento facial e compressão inteligente.",
    longDesc:
      "Gravador de vídeo em rede para até 32 câmeras IP. Grava em 4K com compressão inteligente que reduz o consumo de disco, e oferece busca rápida por eventos com reconhecimento facial.",
    features: [
      "Até 32 canais IP em resolução 4K",
      "Reconhecimento facial integrado",
      "Compressão inteligente (economia de armazenamento)",
      "Acesso remoto via aplicativo",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 3,
    name: "Central de Alarme Inteligente",
    category: "Alarmes",
    brand: "JFL",
    desc: "Gerenciamento via app, 20 zonas de proteção e discadora integrada.",
    longDesc:
      "Central de alarme monitorável com 20 zonas de proteção, gerenciamento completo pelo aplicativo e discadora telefônica integrada para notificação imediata de eventos.",
    features: [
      "20 zonas de proteção configuráveis",
      "Controle total pelo aplicativo",
      "Discadora telefônica integrada",
      "Compatível com sensores com e sem fio",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 4,
    name: "Sensor de Presença sem Fio",
    category: "Alarmes",
    brand: "JFL",
    desc: "Detector infravermelho com tecnologia sem fio de longo alcance.",
    longDesc:
      "Sensor infravermelho passivo sem fio, com longo alcance de comunicação com a central e instalação rápida sem necessidade de cabeamento.",
    features: [
      "Comunicação sem fio de longo alcance",
      "Instalação rápida, sem cabeamento",
      "Baixo consumo de bateria",
      "Imunidade a animais de pequeno porte",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 5,
    name: "Fechadura Biométrica Profissional",
    category: "Controle de Acesso",
    brand: "AGL",
    desc: "Abertura por digital, senha, cartão RFID e Bluetooth.",
    longDesc:
      "Fechadura digital de alta segurança com quatro formas de abertura: biometria, senha numérica, cartão RFID e Bluetooth pelo aplicativo. Ideal para escritórios, clínicas e residências.",
    features: [
      "4 formas de abertura: digital, senha, cartão e app",
      "Registro de acessos pelo aplicativo",
      "Alarme de arrombamento integrado",
      "Abertura de emergência por chave mecânica",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 6,
    name: "Interfone Eletrônico Vídeo",
    category: "Controle de Acesso",
    brand: "AGL",
    desc: "Vídeo porteiro com câmera integrada e comunicação em tempo real.",
    longDesc:
      "Vídeo porteiro com câmera integrada, comunicação bidirecional em tempo real e acionamento de fechadura à distância, com visão noturna para identificação segura a qualquer hora.",
    features: [
      "Câmera integrada com visão noturna",
      "Comunicação de áudio bidirecional",
      "Acionamento remoto de fechadura",
      "Instalação residencial ou comercial",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 7,
    name: "Motor para Portão Automático",
    category: "Automatização",
    brand: "Garen",
    desc: "Abertura e fechamento automático com controle remoto e fotocélula.",
    longDesc:
      "Automatizador robusto para portões deslizantes e basculantes, com controle remoto, fotocélula de segurança anti-esmagamento e fim de curso preciso.",
    features: [
      "Compatível com portões deslizantes e basculantes",
      "Fotocélula de segurança anti-esmagamento",
      "Controles remotos codificados",
      "Operação silenciosa e durável",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 8,
    name: "Motor Residencial para Portão",
    category: "Automatização",
    brand: "Rossi",
    desc: "Automatizador com kits completos de instalação e acessórios.",
    longDesc:
      "Kit completo de automatização residencial: motor, cremalheiras, controles e acessórios de instalação. Solução pronta para o instalador, com suporte técnico da TG.",
    features: [
      "Kit completo: motor + cremalheiras + controles",
      "Ideal para uso residencial",
      "Instalação simplificada",
      "Reposição de peças garantida",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 9,
    name: "Cabo Coaxial HD 95% Malha",
    category: "Cabos e Redes",
    brand: "MPT Cabos",
    desc: "Blindagem tripla para transmissões de vídeo em alta definição.",
    longDesc:
      "Cabo coaxial com 95% de malha e blindagem tripla, projetado para transmissão de vídeo em alta definição sem interferências, mesmo em longas distâncias.",
    features: [
      "95% de malha de blindagem",
      "Transmissão HD sem interferência",
      "Alta durabilidade do condutor",
      "Disponível em bobinas para instaladores",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 10,
    name: "Cabo de Rede CAT6 Profissional",
    category: "Cabos e Redes",
    brand: "Condutti",
    desc: "Fios e cabos especiais para segurança eletrônica de alta qualidade.",
    longDesc:
      "Cabo de rede CAT6 de uso profissional para infraestrutura de CFTV IP e redes corporativas, com condutores de alta pureza e desempenho estável em gigabit.",
    features: [
      "Padrão CAT6 para redes gigabit",
      "Ideal para CFTV IP e redes corporativas",
      "Condutores de alta pureza",
      "Bobinas com metragem identificada",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 11,
    name: "Fonte Chaveada 12V 10A",
    category: "Fontes e Energia",
    brand: "FC Fontes",
    desc: "Alimentação estabilizada para sistemas CFTV e alarmes.",
    longDesc:
      "Fonte chaveada estabilizada 12V/10A para alimentação contínua de câmeras, centrais de alarme e fechaduras, com proteção contra curto-circuito e sobrecarga.",
    features: [
      "Saída estabilizada 12V 10A",
      "Proteção contra curto-circuito e sobrecarga",
      "Baixo aquecimento em operação contínua",
      "Ideal para racks de CFTV",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 12,
    name: "Distribuidor de Energia 8 Canais",
    category: "Fontes e Energia",
    brand: "FC Fontes",
    desc: "Distribuição de energia com proteção contra picos.",
    longDesc:
      "Distribuidor de energia com 8 saídas individuais protegidas, organizando a alimentação de múltiplas câmeras em um único ponto com proteção contra picos de tensão.",
    features: [
      "8 saídas individuais protegidas",
      "Proteção contra picos de tensão",
      "Organização do cabeamento no rack",
      "LEDs indicadores por canal",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 13,
    name: "Haste de Aterramento Industrial",
    category: "Acessórios",
    brand: "Confiseg",
    desc: "Proteção contra surtos com hastes convencionais e cantoneira.",
    longDesc:
      "Hastes de aterramento convencionais e em cantoneira para proteção de equipamentos eletrônicos contra surtos e descargas atmosféricas.",
    features: [
      "Modelos convencionais e cantoneira",
      "Alta condutividade",
      "Resistência à corrosão",
      "Essencial para proteção de CFTV e alarmes",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 14,
    name: "Base e Suporte para Câmera",
    category: "Acessórios",
    brand: "Inove",
    desc: "Suportes e bases para fixação de câmeras e sensores.",
    longDesc:
      "Linha completa de suportes e bases para fixação profissional de câmeras e sensores em paredes, postes e tetos, com acabamento resistente a intempéries.",
    features: [
      "Fixação em parede, poste ou teto",
      "Acabamento resistente a intempéries",
      "Compatível com as principais marcas",
      "Diversos modelos e tamanhos",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 15,
    name: "Trava Elétrica com Fechadura",
    category: "Controle de Acesso",
    brand: "Trava Tec",
    desc: "Sistema de trancamento eletrônico com fechos magnéticos.",
    longDesc:
      "Trava elétrica com fecho magnético para portões sociais e portas de acesso controlado, com acionamento por interfone, botoeira ou controle de acesso.",
    features: [
      "Fecho magnético de alta resistência",
      "Acionamento por interfone ou botoeira",
      "Integração com controle de acesso",
      "Instalação em portões e portas",
    ],
    img: PLACEHOLDER_IMG,
  },
  {
    id: 16,
    name: "Cercas Elétricas de Proteção",
    category: "Acessórios",
    brand: "Líder",
    desc: "Proteção perimetral com tecnologia de choque controlado.",
    longDesc:
      "Sistema completo de cerca elétrica para proteção perimetral, com central de choque controlado dentro das normas, hastes, isoladores e fiação especial.",
    features: [
      "Choque pulsativo dentro das normas",
      "Integração com central de alarme",
      "Kit completo: central, hastes e isoladores",
      "Proteção perimetral 24h",
    ],
    img: PLACEHOLDER_IMG,
  },
];
