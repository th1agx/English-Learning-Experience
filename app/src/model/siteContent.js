/**
 * Model layer — the single source of truth for all site copy.
 * Content lives here, not inside views: views stay presentational
 * and the same layout can render any teacher/course data.
 */

import { createPanel } from './Panel.js';

export const SITE_CONTENT = {
  brand: 'CEFF Education',
  brandAccent: 'English Class',
  whatsappUrl: 'https://wa.me/5534999478541',
  whatsappLabel: 'WhatsApp (34) 99947-8541',

  panels: [
    createPanel({
      id: '01',
      type: 'hero',
      props: {
        kicker: 'Aulas particulares de inglês — online e presencial',
        stamp: 'De A1 até C2',
        titleLines: [
          { text: 'Inglês' },
          { text: 'do jeito', block: true },
          { text: 'certo.', outline: true },
        ],
        lede: 'Teste de nivelamento, plano personalizado e conversação com nativos. Do A1 ao C2, no seu ritmo.',
        facts: [
          { value: 'A1–C2', label: 'todos os níveis' },
          { value: '4', label: 'habilidades' },
        ],
        band: ['Inglês', 'Listening', 'Speaking', 'Reading', 'Writing', 'Nativos', 'A1—C2', 'Online', 'Presencial', 'Excel'],
      },
    }),

    createPanel({
      id: '02',
      type: 'method',
      props: {
        kicker: 'O método',
        title: 'Quatro etapas. Zero enrolação.',
        statement: { big: '1 aluno. 1 plano.', small: 'cada aula é adaptada às suas necessidades' },
        chips: ['Teste de nivelamento', 'Conversação com nativos', 'Online + presencial', 'Suporte contínuo'],
        steps: [
          { n: '01', title: 'Nivela', text: 'Teste inicial identifica seu nível e adapta todo o conteúdo às suas necessidades.' },
          { n: '02', title: 'Pratica', text: 'Listening, speaking, reading e writing em aulas interativas e dinâmicas.' },
          { n: '03', title: 'Conversa', text: 'Conversação com falantes nativos: ambiente real para ganhar fluência e confiança.' },
          { n: '04', title: 'Avança', text: 'Feedback construtivo, suporte por mensagem e materiais para o próximo nível.' },
        ],
      },
    }),

    createPanel({
      id: '03',
      type: 'levels',
      props: {
        kicker: 'Os níveis',
        title: 'Comece onde você está.',
        levels: [
          { code: 'A1', name: 'Iniciante' },
          { code: 'A2', name: 'Básico' },
          { code: 'B1', name: 'Intermediário' },
          { code: 'B2', name: 'Intermediário avançado' },
          { code: 'C1', name: 'Avançado' },
          { code: 'C2', name: 'Proficiente' },
        ],
      },
    }),

    createPanel({
      id: '04',
      type: 'plans',
      props: {
        kicker: 'Planos mensais',
        title: 'Quanto mais pratica, menos custa.',
        rows: [
          { freq: '1× semana', desc: '4 aulas por mês', unit: 'R$ 50 /aula', price: 'R$ 200' },
          { freq: '2× semana', desc: '8 aulas por mês', unit: 'R$ 40 /aula', price: 'R$ 320' },
          { freq: '3× semana', desc: '12 aulas por mês', unit: 'R$ 33,33 /aula', price: 'R$ 400' },
        ],
        note: '* Aulas de 1 hora · Dupla e grupo (3+) com valores reduzidos · Aula avulsa R$ 60',
      },
    }),

    createPanel({
      id: '05',
      type: 'cta',
      props: {
        kicker: 'Comece hoje',
        titleTop: 'Sua primeira',
        titleHighlight: 'aula',
        titleBottom: 'é grátis.',
        lede: 'Agende a aula experimental e dê o primeiro passo rumo à fluência. Sem compromisso.',
        meta: 'Online · Presencial · Inglês e Excel',
      },
    }),
  ],
};
