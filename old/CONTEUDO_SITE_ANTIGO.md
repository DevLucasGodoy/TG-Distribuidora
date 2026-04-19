# Conteúdo do Site Antigo — TG Distribuidora

> Extraído da aplicação CodeIgniter (PHP MVC) em `old/`
> Gerado em: 2026-04-19

---

## Identidade da Empresa

- **Nome:** TG Distribuidora
- **Site:** tgdistribuidora.com.br
- **Descrição meta:** "Seja bem vindo ao novo portal da TG Distribuidora."
- **Copyright:** © Copyright 2019. Todos os direitos reservados à TG distribuidora.
- **Google Analytics:** UA-50371103-1
- **Desenvolvido por:** Bruno de Andrade (<www.brunodeandrade.com.br>)

---

## Menu de Navegação

| Item | URL |
|------|-----|
| Home | / |
| Empresa | /empresa |
| Produtos | /produtos |
| Noticias | /noticias |
| Fale conosco | /contato |

**Busca:** placeholder `"Informe o nome ou o codigo do produto"` — POST para `/produtos/busca`

---

## Header

- **Logo:** `assets/geral/images/logo.png`
- **Telefone exibido no cabeçalho:** Fone: (67) 3032-3090 / (67) 3021-3150
- **Facebook:** <https://www.facebook.com/tgdistribuidora/>

---

## Footer

### Loja Dourados

- Rua Pedro Rigotti, 925, Vila Santo André
- CEP: 79810-120 — Dourados/MS
- (67) 3032-3090
- (67) 3021-3150

### Loja Campo Grande

- Av. Salgado Filho, 1756
- CEP: 79005-330 — Campo Grande/MS
- (67) 3043-3090
- (67) 3042-3091

### Loja Ponta Porã

- Av. Paraguai, 2310
- Centro — Ponta Porã/MS
- (67) 3431-6421

### Newsletter

- Texto: "Receba nossas novidades em seu e-mail."
- Placeholder do campo: "Digite seu e-mail aqui"
- Botão: "Cadastrar"

---

## Página: Home (`/`)

### Sidebar — Seção de Produtos

- **Título da sidebar:** Produtos
- Lista acordeão de categorias + subcategorias (dinâmico, vindo do banco de dados)

### Conteúdo principal

- Slider de banners (imagens dinâmicas do banco)
- Grid de produtos em destaque (4 por linha), cada card exibe:
  - Imagem do produto
  - Nome do produto (link para detalhes)

---

## Página: Empresa (`/empresa`)

### Estrutura

- Título da empresa (dinâmico — campo `titulo` no banco, tabela `empresa`)
- Texto descritivo (dinâmico — campo `texto`, exibido em `<blockquote>` com `text-align: justify`)
  - Assinado: **TG Distribuidora**
- Banner lateral (imagem do banco — `assets/uploads/empresa/[banner]`)
- Carrossel de fotos da empresa (dinâmico — `assets/uploads/empresa/fotos/`)

> **Nota:** O conteúdo real (título e texto) estava armazenado no banco de dados. Não há texto fixo no código desta página além da assinatura "TG Distribuidora". O texto deve ser recuperado do dump do banco ou de um backup.

---

## Página: Produtos (`/produtos`)

### Breadcrumb

`Home › Produtos`

### Sidebar

- **Título:** Categorias
- Lista de categorias com contador de produtos por categoria

### Grid de produtos

Cada card exibe:

- Imagem
- Nome (link para detalhes)
- `Código: [código do produto]`

### Página de detalhes do produto (`/produtos/detalhes/[url]`)

#### Breadcrumb

`Home › Produtos › [Categoria] › [Subcategoria] › [Nome do Produto]`

#### Abas navegáveis

1. **Informações**
   - Nome do produto
   - `Código: [código]`
   - `Marca: [marca]`
   - Resumo (em itálico)
   - `Descrição:` + texto completo

2. **Dados Técnicos**
   - Especificações técnicas (HTML decodificado)

3. **Imagens** *(aparece somente se houver imagens extras)*
   - Carrossel de fotos adicionais com navegação Anterior/Próximo

#### Produtos relacionados

- Título: **Produtos relacionados**
- Lista com imagem, nome e código de cada produto relacionado

---

## Página: Categorias (`/produtos/categoria/[id]`)

### Breadcrumb

`Home › Produtos › [Nome da Categoria]`

### Sidebar

- Lista de subcategorias da categoria

### Grid de produtos

- Mesmo layout da página de produtos (imagem + nome + código)

---

## Página: Subcategorias (`/produtos/subcategoria/[id]`)

### Breadcrumb

`Home › Produtos › [Categoria] › [Subcategoria]`

### Grid de produtos

- Mesmo layout das demais páginas de produtos

---

## Página: Busca (`/produtos/busca`)

- Exibe contador: quantidade de produtos encontrados
- Grid de produtos com imagem, nome e código
- Busca por nome ou código do produto

---

## Página: Notícias (`/noticias`)

### Seção: Notícias em destaque

- Título: **Notícias em destaque**
- Cada item exibe:
  - Imagem
  - Título (link para detalhes)
  - Resumo (`text-align: justify`)
  - Botão: **Continue lendo**

### Seção: Notícias

- Título: **Notícias**
- Mesmo layout das em destaque

### Estado vazio

- Mensagem: "Nenhuma notícia cadastrada"

---

## Página: Detalhes da Notícia (`/noticias/detalhes/[id]`)

- Título da notícia
- Imagem principal
- Resumo em negrito
- Texto completo (HTML decodificado)
- Galeria de imagens adicionais

---

## Página: Fale Conosco (`/contato`)

### Google Maps

- Local: Rua Pedro Rigotti, 925, Vila Santo André, 79810-120 — Dourados/MS
- Iframe embed do Google Maps

### Formulário de Contato

- **Título:** Fale conosco
- Campos:
  - `Nome:` (obrigatório)
  - `E-mail:` (obrigatório, validação de formato)
  - `Assunto:` (obrigatório)
  - `Mensagem:` (textarea, obrigatório)
- Botão: **Enviar!**
- Feedback de sucesso: "Mensagem enviada com sucesso!"
- Feedback de erro: "Não foi possível enviar sua mensagem agora. Por favor, tente novamente!"

### Sidebar — Nossa localização

- **Título:** Nossa localização
- R. Pedro Rigotti, 925, Vila Santo André, 79810-120 — Dourados/MS
- (67) 3032-3090
- (67) 3021-3150
- <vendas@tgdistribuidora.com.br>

### Sidebar — Horário de atendimento

- **Título:** Horário de atendimento
- Segunda à Sexta: 8:00 às 18:00
- Sábado: 8:00 às 12:00

---

## Informações de Contato (consolidadas)

| Campo | Valor |
|-------|-------|
| E-mail | <vendas@tgdistribuidora.com.br> |
| Facebook | <https://www.facebook.com/tgdistribuidora/> |
| Dourados — Tel 1 | (67) 3032-3090 |
| Dourados — Tel 2 | (67) 3021-3150 |
| Campo Grande — Tel 1 | (67) 3043-3090 |
| Campo Grande — Tel 2 | (67) 3042-3091 |
| Ponta Porã | (67) 3431-6421 |

---

## Imagens do Site

### Branding / Logo

| Arquivo | Descrição |
|---------|-----------|
| `assets/geral/images/logo.png` | Logo principal (exibida no header) |
| `assets/geral/images/logoBACK.png` | Logo alternativa (fundo escuro) |
| `assets/geral/images/logo_back.png` | Logo para painel administrativo |
| `assets/geral/images/logo.psd` | Fonte editável do logo (Photoshop) |
| `assets/geral/images/TG Distribuidora Logo.cdr` | Fonte vetorial do logo (CorelDRAW) |
| `assets/geral/images/TG Distribuidora Fachada.cdr` | Arte da fachada (CorelDRAW) |
| `assets/geral/images/favicon.ico` | Favicon do site |

### Banners do Slider (Home)

| Arquivo | Descrição |
|---------|-----------|
| `assets/geral/images/slider1.jpg` | Banner 1 |
| `assets/geral/images/slider2.jpg` | Banner 2 |
| `assets/geral/images/slider3.jpg` | Banner 3 |
| `assets/geral/images/slider4.jpg` | Banner 4 |

> Os banners do site em produção são gerenciados pelo painel e ficam em `assets/uploads/banners/`

### Imagens de Notícias (template)

| Arquivo |
|---------|
| `assets/geral/images/latest1.jpg` |
| `assets/geral/images/latest2.jpg` |
| `assets/geral/images/latest3.jpg` |
| `assets/geral/images/latest4.jpg` |
| `assets/geral/images/latest5.jpg` |
| `assets/geral/images/latest6.jpg` |
| `assets/geral/images/latest7.jpg` |
| `assets/geral/images/latest8.jpg` |

### Imagens de Marcas (Parceiros)

| Arquivo | Marca |
|---------|-------|
| `assets/geral/images/marcas/genro.jpg` | Genro |
| `assets/geral/images/marcas/genro.png` | Genro (PNG) |
| `assets/geral/images/marcas/omegasat.png` | Omegasat |

### Ícones de UI

| Arquivo | Uso |
|---------|-----|
| `assets/geral/images/ico1.png` … `ico6.png` | Ícones de seção |
| `assets/geral/images/icon1.png` … `icon4.png` | Ícones menores |
| `assets/geral/images/search.png` | Ícone de busca |
| `assets/geral/images/search-bt.png` | Botão de busca |
| `assets/geral/images/arrow-left.png` | Seta esquerda |
| `assets/geral/images/arrow-right.png` | Seta direita |
| `assets/geral/images/arrow-slider-left.png` | Seta slider esquerda |
| `assets/geral/images/arrow-slider-right.png` | Seta slider direita |
| `assets/geral/images/circle.png` | Círculo decorativo |
| `assets/geral/images/quotes.png` | Aspas decorativas |
| `assets/geral/images/ui.totop.png` | Botão "voltar ao topo" |
| `assets/geral/images/loader.gif` | Animação de carregamento |
| `assets/geral/images/view.jpg` | Imagem de visualização |

### Imagens de Depoimentos (template)

| Arquivo |
|---------|
| `assets/geral/images/testimonials1.jpg` |
| `assets/geral/images/testimonials2.jpg` |
| `assets/geral/images/testimonials3.jpg` |
| `assets/geral/images/testimonials4.jpg` |

### Imagens de Lista (decorativas)

| Arquivo |
|---------|
| `assets/geral/images/ul-list.png` |
| `assets/geral/images/ul-list-2.png` |
| `assets/geral/images/ul-list-3.png` |

### Ícones Apple Touch

| Arquivo |
|---------|
| `assets/geral/images/apple-touch-icon-57-precomposed.png` |
| `assets/geral/images/apple-touch-icon-72-precomposed.png` |
| `assets/geral/images/apple-touch-icon-114-precomposed.png` |
| `assets/geral/images/apple-touch-icon-144-precomposed.png` |

### Imagens de Conteúdo (dinâmicas — banco de dados)
>
> Estas imagens eram gerenciadas pelo painel administrativo e ficam na pasta `assets/uploads/`:

| Pasta | Conteúdo |
|-------|----------|
| `assets/uploads/banners/` | Imagens do slider da home |
| `assets/uploads/produtos/[id_md5]/` | Foto principal de cada produto |
| `assets/uploads/produtos/[id_md5]/` | Fotos adicionais de cada produto (tabela `img_produtos`) |
| `assets/uploads/noticias/[id_md5]/` | Foto principal de cada notícia |
| `assets/uploads/noticias/[id_md5]/` | Fotos adicionais de notícias (tabela `img_noticias`) |
| `assets/uploads/empresa/` | Banner da página Empresa |
| `assets/uploads/empresa/fotos/` | Galeria de fotos da empresa |

---

## Estrutura do Banco de Dados (tabelas identificadas)

| Tabela | Conteúdo |
|--------|----------|
| `categorias` | Categorias de produtos |
| `subcategorias` | Subcategorias (vinculadas a categorias) |
| `produtos` | Catálogo de produtos |
| `img_produtos` | Imagens adicionais de produtos |
| `relacionados` | Vínculos entre produtos relacionados |
| `marcas` | Marcas/fabricantes |
| `banners` | Imagens do slider da home |
| `noticias` | Posts/notícias |
| `img_noticias` | Imagens adicionais de notícias |
| `empresa` | Informações da empresa (título, texto, banner) |
| `contatos` | Mensagens recebidas pelo formulário |
| `newsletter` | E-mails inscritos na newsletter |

---

## Validações e Mensagens de Feedback

### Formulário de Contato

| Situação | Mensagem |
|----------|----------|
| Nome vazio | "Por favor, informe seu nome!" |
| E-mail vazio | "Por favor, informe seu E-mail!" |
| Assunto vazio | "Por favor, informe o assunto!" |
| Mensagem vazia | "Por favor, informe sua mensagem!" |
| E-mail inválido | "Por favor, informe um e-mail válido!" |
| Enviado com sucesso | "Mensagem enviada com sucesso!" |
| Erro no envio | "Não foi possível enviar sua mensagem agora. Por favor, tente novamente!" |

### Newsletter

| Situação | Mensagem |
|----------|----------|
| E-mail vazio | "Por favor, informe seu e-mail!" |
| E-mail inválido | "Por favor, informe um e-mail válido!" |
| E-mail já cadastrado | "E-mail já cadastrado!" |
| Cadastrado com sucesso | "E-mail cadastrado com sucesso!" |
| Erro | "Não foi possível cadastrar seu E-mail! Tente novamente." |

---

## Páginas do Painel Administrativo

| Arquivo | Função |
|---------|--------| 
| `p_login.php` | Login do administrador |
| `p_home.php` | Dashboard |
| `p_empresa.php` | Editar informações da empresa |
| `p_produtos.php` | CRUD de produtos |
| `p_categorias.php` | CRUD de categorias |
| `p_subcategorias.php` | CRUD de subcategorias |
| `p_marcas.php` | CRUD de marcas |
| `p_banners.php` | CRUD de banners |
| `p_noticias.php` | CRUD de notícias |
| `p_contatos.php` | Visualizar contatos recebidos |
| `p_newsletter.php` | Gerenciar e-mails da newsletter |

---

## Tecnologias Utilizadas

- **Backend:** PHP com framework CodeIgniter (MVC)
- **Frontend:** Bootstrap 2/3, jQuery
- **Plugins JS:** FlexSlider, ElastiSlide, PrettyPhoto, Quicksand, Superfish, Smoothscroll
- **Ícones:** Font Awesome, IcoMoon
- **Editor rich-text (painel):** Summernote
- **Analytics:** Google Analytics (UA-50371103-1)
