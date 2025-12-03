# 🚀 KORA Growth - Landing Page Premium

Landing page de nível **YC-backed startup** para consultoria comercial especializada em startups early-stage.

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-ff0055.svg)

## ✨ Features Premium

### 🎨 Design & Animações
- **Sistema de animações global** com spring physics premium (stiffness: 100, damping: 15)
- **Custom cursor** com múltiplos estados (hover, click, text)
- **Fluid background** com blobs animados e grid pattern
- **Scroll-triggered animations** em todas as seções
- **3D tilt cards** com efeito glare
- **Gradient text** com animação shimmer
- **Microinterações** premium em todos os elementos clicáveis

### 📊 Componentes Criados
- `AnimationSystem.tsx` - Variants e hooks reutilizáveis
- `CountUp.tsx` - Contador animado para métricas
- `TiltCard.tsx` - Card com efeito 3D no hover
- `Accordion.tsx` - FAQ com animações suaves
- `Countdown.tsx` - Timer regressivo para urgência
- `TrustBar.tsx` - Marquee duplo de logos de clientes

### 🎯 Seções Implementadas
1. **Hero Section** - Social proof, stats bar, scroll indicator
2. **Trust Bar** - Logos de clientes + métricas sociais
3. **Problem Section** - Gráfico SVG animado + quote card
4. **Metrics Section** - Count-up animado + tilt cards
5. **Who We Are** - Sobre a consultoria
6. **Solution Section** - 3 pilares com mini métricas
7. **Diagnosis Section** - Formulário inline + timeline
8. **Services Section** - 3 tiers com badges e case studies
9. **FAQ Section** - 8 perguntas com accordion
10. **Urgency Section** - Countdown + slots disponíveis
11. **CTA Final** - Background animado + avatars
12. **Footer Premium** - 4 colunas + back to top

### 🎨 CSS Premium
- **10+ keyframes**: shimmer, float, glow-pulse, ripple, gradient-rotate
- **Classes utilitárias**: glass-card, premium-card, btn-shimmer, btn-glow
- **Tipografia responsiva** com clamp()
- **Grid e dot patterns** para backgrounds
- **Custom scrollbar** (oculta)

### 🔧 Otimizações
- Meta tags completas (SEO, Open Graph, Twitter)
- Preload de fontes críticas
- Lazy loading de seções
- `will-change` otimizado
- Loading state com spinner
- Prevenção de FOUC

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/criminaly-vicious/kora-growth.git

# Entre na pasta
cd kora-growth

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
```

## 🛠️ Stack Tecnológica

- **React 19.2.0** - Framework UI
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool ultra-rápido
- **Framer Motion 12.23.24** - Animações premium
- **TailwindCSS** - Utility-first CSS (via CDN)
- **Lucide React** - Ícones modernos
- **Google Gemini AI** - Chat inteligente (opcional)

## 📂 Estrutura do Projeto

```
kora-growth/
├── assets/              # Imagens e SVGs
│   └── logo.svg
├── components/          # Componentes React
│   ├── AIChat.tsx
│   ├── Accordion.tsx
│   ├── AnimationSystem.tsx
│   ├── CountUp.tsx
│   ├── Countdown.tsx
│   ├── CustomCursor.tsx
│   ├── FluidBackground.tsx
│   ├── GlitchText.tsx
│   ├── TiltCard.tsx
│   └── TrustBar.tsx
├── services/           # Serviços externos
│   └── geminiService.ts
├── App.tsx            # Componente principal
├── index.css          # Estilos globais
├── index.html         # HTML template
├── index.tsx          # Entry point
└── vite.config.ts     # Configuração Vite
```

## 🎨 Identidade Visual

### Cores
- **Primary Dark**: `#0C0D26`
- **Secondary**: `#1D1E4F`
- **Accent**: `#6A6FF0`
- **Text**: `#C8C9D9`

### Tipografia
- **Headings**: Space Grotesk (300, 400, 500, 600, 700)
- **Body**: Inter (300, 400, 500, 600)

## ⚙️ Configuração Opcional

### Gemini AI Chat

Para habilitar o chat AI, crie um arquivo `.env` na raiz:

```env
GEMINI_API_KEY=sua_chave_aqui
```

Sem a chave, o chat usa respostas mockadas inteligentes.

## 📱 Responsividade

- **Desktop**: Experiência completa com cursor customizado
- **Tablet**: Adaptação de layouts e espaçamentos
- **Mobile**: Touch-optimized, menu mobile, snap scroll

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Arraste a pasta 'dist' para Netlify
```

### GitHub Pages

```bash
# Instale gh-pages
npm install --save-dev gh-pages

# Adicione no package.json:
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Amazing Feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 License

Este projeto está sob a licença Apache 2.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**KORA Growth**
- Website: [koragrowth.com](https://koragrowth.com)
- GitHub: [@criminaly-vicious](https://github.com/criminaly-vicious)

## 🙏 Agradecimentos

- Design inspirado em startups YC-backed
- Animações baseadas em Framer Motion best practices
- UI patterns de empresas SaaS líderes de mercado

---

**Desenvolvido com método, não com sorte.** 🚀
