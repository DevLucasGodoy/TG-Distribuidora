import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote images.
  images: {
    // Só no `next dev`: deixa testar a loja contra o Syncro rodando em
    // localhost. O Next 16 recusa otimizar imagem de IP local; em produção a
    // regra continua ligada.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
    // 75 = padrão (miniaturas e cartões); 90 = foto grande do produto
    // (components/loja/ProdutoDetalhe.tsx). O Next 16 só aceita o que está aqui.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  turbopack: {},
};

export default nextConfig;
