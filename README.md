# English Learning Experience — CEFF Education

> Projeto de website para substituir o PDF de apresentação (CEFF_2026.pdf) usado pelo professor de inglês **Kadu** nas negociações com novos alunos. O site apresenta o serviço de aulas particulares de inglês — do nível A1 ao C2, online e presencial — e canaliza o interessado para o agendamento da aula experimental gratuita via WhatsApp.

## Status do projeto

**Fase de validação visual.** Foram desenvolvidos **três conceitos visuais completos e independentes** para o mesmo conteúdo real (extraído do PDF oficial do professor). O objetivo desta fase é que o professor escolha uma direção estética; o conceito vencedor será refinado com fotos reais, deploy público e domínio próprio.

| Conceito | Arquivo | Estilo | Paleta |
|---|---|---|---|
| 1 — Minimalista Editorial | [`concepts/concept-1-minimal-editorial.html`](concepts/concept-1-minimal-editorial.html) | Tipografia serifada em grande escala, seções numeradas ao estilo revista (Nº 01–06), linhas finas, muito espaço negativo | Creme `#F4F1EA` · Preto `#141412` · Vermelho queimado `#B3362B` |
| 2 — Neo-brutalista | [`concepts/concept-2-neo-brutalist.html`](concepts/concept-2-neo-brutalist.html) | Tipografia pesada (Archivo Black), bordas de 3px, sombras duras, tickers em marquee, blocos de cor sólidos e leves rotações | Papel `#F5F2E9` · Preto `#111` · Cobalto `#1F3FD8` · Amarelo `#F5C518` · Vermelho `#E0442A` |
| 3 — Editorial Híbrido | [`concepts/concept-3-hybrid-editorial.html`](concepts/concept-3-hybrid-editorial.html) | Mistura minimalismo + neo-brutalism: serif de display contrastando com grotesca, grid assimétrico, numerais vazados (outline), composição artística | Musgo `#2C3B32` · Areia `#EDE8DC` · Off-white `#F6F3EC` |

Cada conceito tem personalidade própria por decisão de projeto — **não** são variações do mesmo template, nem foi feita qualquer mistura entre os estilos durante a fase de descoberta.

## Conteúdo

Todos os conceitos apresentam o mesmo conteúdo, extraído do PDF oficial de apresentação do professor:

- **Marca**: CEFF Education — English Class
- **Serviço**: aulas particulares de inglês (e Excel), online e presencial
- **Níveis**: A1 (iniciante) até C2 (proficiente), com teste de nivelamento inicial
- **Método**: as 4 habilidades (Listening, Speaking, Reading, Writing), abordagem interativa com jogos e multimídia, conversação com falantes nativos, suporte contínuo fora das aulas (e-mail/mensagens), materiais complementares e feedback construtivo
- **Planos mensais** (aulas de 1 hora):
  - Individual — 1×/semana R$ 200 (R$ 50/aula) · 2×/semana R$ 320 (R$ 40/aula) · 3×/semana R$ 400 (R$ 33,33/aula)
  - Dupla — R$ 160 / R$ 240 / R$ 300 por aluno
  - Grupo (3+ pessoas) — R$ 115 / R$ 190 / R$ 270 por aluno
  - Aula avulsa: R$ 60
- **CTA**: aula experimental gratuita via WhatsApp [(34) 99947-8541](https://wa.me/5534999478541)

## Arquitetura técnica

### Princípios

- **Zero dependências de build**: cada conceito é um único arquivo HTML autocontido (inline CSS). Não há bundler, framework, pré-processador nem `package.json`.
- **Tipografia via Google Fonts** com `font-display: swap` implícito e fallbacks de sistema (`serif`/`sans-serif`):
  - Conceito 1: `Fraunces` (serif variável, opsz 9–144) + `Inter`
  - Conceito 2: `Archivo Black` + `Archivo` + `Space Mono`
  - Conceito 3: `Instrument Serif` + `Space Grotesk`
- **Imagens**: fotos placeholder do Unsplash (`images.unsplash.com`), tratadas via CSS (`filter: grayscale/contrast`) para harmonizar com cada paleta. Substituição prevista pelas fotos reais do professor.
- **Design system por variáveis CSS**: todas as cores de cada conceito estão isoladas em `:root { --… }`, permitindo retarget de paleta sem tocar no restante do CSS (a paleta do Conceito 3 já foi trocada duas vezes desta forma).

### Estrutura de arquivos

```
English-Learning-Experience/
├── README.md
├── concepts/
│   ├── concept-1-minimal-editorial.html   # Homepage completa, estilo minimal editorial
│   ├── concept-2-neo-brutalist.html       # Homepage completa, estilo neo-brutalista
│   └── concept-3-hybrid-editorial.html    # Homepage completa, estilo híbrido
└── screenshots/                           # Capturas de tela para referência/apresentação
```

### Anatomia de cada homepage

Todos os conceitos cobrem o mesmo esqueleto de conteúdo, cada um na sua linguagem visual:

1. **Header/sticky nav** com âncoras internas (`#professor`, `#metodo`, `#niveis`, `#planos`, `#contato`) e CTA de aula gratuita
2. **Hero** com headline forte + prova rápida de valor (níveis, habilidades)
3. **O Professor** — aula particular, teste de nivelamento, personalização
4. **O Método** — 4 etapas (nivelamento → prática das 4 habilidades → conversação com nativos → suporte contínuo)
5. **Níveis A1–C2** — os seis níveis CEFR com descrição de cada um
6. **Compromisso/diferenciais** — feedback, canal aberto, material extra, nativos
7. **Planos mensais** — tabela editorial de preços (individual/dupla/grupo)
8. **CTA final** — WhatsApp com link direto `https://wa.me/5534999478541`

Decisões de design explícitas (aplicadas nos três conceitos):

- Sem excesso de cards nem componentes arredondados genéricos
- Sem gradientes, glassmorphism, blobs, 3D ou estética futurista
- Hierarquia por **tipografia, escala e espaço negativo**, não por ornamento
- Estrutura editorial (listas, tabelas, seções numeradas) em vez do padrão SaaS "hero + 3 cards + depoimentos + pricing"

### Detalhes de implementação por conceito

**Conceito 1 — Minimalista Editorial**
- Serif `Fraunces` weight 300/400 com itálicos em vermelho queimado para palavras-chave
- Grid de 12 colunas implícito (`max-width: 1240px`, gutter 80–96px)
- Seções numeradas "Nº 01–06" com filetes de 1px (`--rule`)
- Planos como lista tabular com linhas divisórias, não cards
- `::selection` customizado (vermelho)

**Conceito 2 — Neo-brutalista**
- Bordas `3px solid #111` como principal elemento estrutural (layout inteiro construído por colapsos de borda)
- Sombras duras `box-shadow: 4–8px 4–8px 0 #111` e micro-rotações (`transform: rotate(±1–4deg)`) em selos/etiquetas
- Dois tickers `marquee` animados por `@keyframes` (topbar e band de habilidades)
- Headline com `-webkit-text-stroke` (texto vazado) + highlight com sombra dura
- Botão CTA com transição de "sombra dura → pressionado" no hover

**Conceito 3 — Editorial Híbrido**
- Contraste tipográfico serif display (`Instrument Serif` 88–118px) × grotesca (`Space Grotesk` 11–17px, caps com tracking)
- Numerais decorativos vazados via `-webkit-text-stroke` sobrepostos à foto do hero (`position: absolute`)
- Grid assimétrico (1.25fr / 0.75fr) com coluna lateral "sticky" na seção de níveis
- Navegação por estados de hover tipográficos (cor + `padding-left` animado nas linhas do método)
- Planos como citação editorial gigante + tríade de colunas com filetes

### Compatibilidade

- Desktop-first, viewport recomendado ≥ 1280px (validado a 1440×900)
- `-webkit-text-stroke` é progressivo: em navegadores sem suporte o texto volta a sólido — degradação graciosa
- Sem JavaScript em nenhum dos três conceitos
- Responsividade mobile: **não implementada nesta fase** (mockups desktop para decisão de direção visual); será adicionada no conceito vencedor

## Como visualizar

**Opção A — abrir direto** (requer internet para fontes e fotos):

Baixe/clonе o repositório e abra qualquer arquivo de `concepts/` com dois cliques no navegador.

**Opção B — servidor local**:

```bash
# na raiz do repositório
npx serve concepts
# ou
python -m http.server 8080 --directory concepts
```

## Roadmap

- [x] Extração do conteúdo real do PDF oficial (CEFF_2026.pdf)
- [x] Conceito 1 — Minimalista Editorial (desktop)
- [x] Conceito 2 — Neo-brutalista (desktop)
- [x] Conceito 3 — Editorial Híbrido (desktop, paleta validada: musgo + areia)
- [ ] Substituição das fotos placeholder pelas fotos reais do professor
- [ ] Escolha do conceito vencedor pelo professor
- [ ] Refinamento do vencedor: responsividade mobile, SEO básico, meta tags OG
- [ ] Deploy (Netlify/Vercel/GitHub Pages) + domínio próprio
- [ ] Depoimentos reais de alunos (nesta fase, a seção de prova social usa o compromisso do método, sem depoimentos fictícios)

## Decisões e restrições de conteúdo

- **Idioma**: português brasileiro (público-alvo são alunos brasileiros), mantendo termos de marca em inglês (CEFF Education — English Class) e o vocabulário didático (Listening, Speaking etc.) como no PDF original.
- **Sem depoimentos fictícios**: o PDF original não contém depoimentos; para não inventar prova social, a seção correspondente apresenta o compromisso pedagógico do método. Depoimentos reais entram depois da escolha do conceito.
- **Preços**: replicados fielmente do PDF, incluindo nota de rodapé sobre aula avulsa (R$ 60) e duração de 1h.

## Licença e uso

Projeto de encomenda para o CEFF Education — English Class. Todos os direitos de conteúdo pertencem ao professor. Código produzido sob medida para este projeto.
