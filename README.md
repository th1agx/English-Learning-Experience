# English Learning Experience — CEFF Education

> Website do CEFF Education — English Class: aulas particulares de inglês (e Excel), do nível A1 ao C2, online e presencial. Substitui o PDF de apresentação (CEFF_2026.pdf) usado nas negociações com novos alunos, canalizando o interessado para a aula experimental gratuita via WhatsApp.

## Stack

**React 19 + Vite + GSAP (ScrollTrigger) + Framer Motion + Lenis** — SPA única, sem backend.

| Peça | Papel |
|---|---|
| React 19 | UI em componentes puros |
| Vite 8 | Dev server e build |
| GSAP + ScrollTrigger | Coreografia de scroll (a "câmera") |
| Framer Motion | Entradas/saídas reversíveis dos painéis, cursor, magnéticos |
| Lenis | Smooth scroll (lerp) sincronizado ao ticker do GSAP |
| @gsap/react | `useGSAP` com escopo e cleanup automático |

## Arquitetura (MVC + SOLID)

```
app/src/
├── model/                 # M: entidades de domínio + conteúdo (fonte única de verdade)
│   ├── Panel.js           #    contrato/fábrica de painéis
│   └── siteContent.js     #    todo o copy do site (níveis, método, planos, CTA)
├── data/                  #    camada de dados: interface do repositório + implementação in-memory
│   ├── SiteContentRepository.js
│   └── InMemorySiteContentRepository.js
├── controllers/           # C: orquestração
│   ├── SiteProvider.jsx   #    container de DI: carrega o model via repositório, expõe por contexto
│   └── useCameraJourney.js#    a câmera: track, parallax, cruzamento horizontal, contador, rail
├── views/                 # V: componentes puramente presentacionais
│   ├── Sections.jsx       #    fluxo de painéis renderizado do model
│   ├── panelRegistry.js   #    registry de painéis (Open/Closed)
│   ├── motion.js          #    vocabulário Framer compartilhado (máscaras, springs, pops)
│   ├── panels/            #    Hero, Method, Levels, Plans, CTA
│   └── chrome/            #    Hud, Cursor (pixel-art), Magnetic
└── lib/                   #    infra: animationEngine (adapter GSAP + Lenis — único ponto de import)
```

- **Model** puro (zero React/GSAP/DOM). **Views** recebem props e renderizam — sem conhecer scroll ou origem dos dados. Painéis são data-driven via `panelRegistry`: adicionar um tipo novo não altera o renderer.
- **Controllers** concentram efeitos: `SiteProvider` (Dependency Inversion — um CMS entra trocando só a implementação do repositório) e `useCameraJourney` (toda a coreografia de scroll).
- **Infra** (`lib/animationEngine.js`): adapter único do GSAP/Lenis — trocar de engine reescreve só este arquivo.

## O conceito de movimento

1. **Câmera fixa**: a tela é um palco `position: fixed`; o site inteiro vive num track vertical transladado por um único tween GSAP com scrub + Lenis — o site passa *pela* câmera, não a página rolando.
2. **Entradas reversíveis**: cada painel recebe `active` (quem está no centro da lente) e alterna variantes Framer — títulos sobem de máscaras, listas entram com spring e skew, selos fazem pop elástico. Rolar de volta reverte tudo.
3. **Parallax multicamada**: elementos `data-depth` derivam em velocidades próprias conforme o progresso local de cada painel.
4. **Momento horizontal**: a faixa A1→C2 (`data-x`) cruza a tela lateralmente enquanto seu painel passa.
5. **Detalhes vivos**: marquee ticker no hero, chips rotacionados, cursor pixel-art custom, botão magnético (segue o cursor com spring) com pressão no clique.

## Design

- **Paleta**: off-white (`#F7F5EF`) e preto (`#131311`) predominantes; amarelo manteiga (`#F5C518`) só em destaques; vermelho (`#E0442A`) em detalhes (selo, numerais, preços, rail).
- **Neo-brutalismo dosado**: tipografia Archivo Black em mega escala, bordas de 3px, sombras duras pontuais, texto vazado (outline), selo rotacionado — com bastante respiro entre elementos.
- **Sem imagens** (decisão do professor): toda a expressão vem de tipografia, cor e composição.
- **Layout assimétrico**: texto ancorado à esquerda, tabela de planos deslocada à direita, numerais vazados gigantes nos cantos.

## Como rodar

```bash
cd app
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ pronto para deploy (Netlify/Vercel/GitHub Pages)
```

## Roadmap

- [x] Conteúdo real extraído do PDF oficial (níveis A1–C2, método, planos, WhatsApp)
- [x] Sistema de câmera fixa (GSAP scrub + Lenis) com entradas Framer reversíveis
- [x] Paleta validada: off-white/preto predominante, manteiga pontual, detalhes vermelho
- [x] Cursor pixel-art custom + botão magnético
- [x] Responsividade mobile (faixa A1–C2 vira grid em tela estreita, sem cruzamento horizontal)
- [x] SEO básico e meta tags OG (Open Graph, Twitter card, JSON-LD, canonical, og-image)
- [ ] Deploy público + domínio próprio (workflow GitHub Pages pronto em `.github/workflows/deploy.yml` — ativar Pages em Settings → Pages → GitHub Actions; domínio próprio ainda pendente)
- [ ] Depoimentos reais de alunos

## Decisões de conteúdo

- **Idioma**: português brasileiro, com termos de marca em inglês (CEFF Education — English Class) como no PDF original.
- **Sem depoimentos fictícios**: o PDF original não os contém; a prova social entra com depoimentos reais depois.
- **Preços** replicados fielmente do PDF (individual R$ 200/320/400 · dupla e grupo por aluno · avulsa R$ 60 · aulas de 1h).

## Licença e uso

Projeto de encomenda para o CEFF Education — English Class. Todos os direitos de conteúdo pertencem ao professor. Código produzido sob medida para este projeto.
