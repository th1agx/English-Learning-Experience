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
        lede: 'Aula experimental gratuita, teste de nivelamento e plano de estudos personalizado. Conversação com nativos, material próprio e acompanhamento contínuo — do primeiro contato ao nível proficiente.',
        facts: [
          { value: 'A1–C2', label: 'todos os níveis' },
          { value: '4', label: 'habilidades' },
          { value: '1h', label: 'por aula' },
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
        chips: ['Aula experimental grátis', 'Teste de nivelamento', 'Conversação com nativos', 'Material próprio incluso', 'Online + presencial', 'Suporte por mensagem'],
        steps: [
          { n: '01', title: 'Nivela', text: 'Antes da primeira aula, um teste inicial identifica exatamente onde você está — do A1 ao C2 — e define o ponto de partida do seu plano.' },
          { n: '02', title: 'Pratica', text: 'Aulas interativas de 1 hora trabalhando as quatro habilidades: listening, speaking, reading e writing, com material didático bilíngue próprio.' },
          { n: '03', title: 'Conversa', text: 'Conversação com falantes nativos: exposição real ao idioma para ganhar fluência, vocabículo e confiança para usar o inglês de verdade.' },
          { n: '04', title: 'Avança', text: 'Feedback construtivo a cada aula, suporte por mensagem entre as aulas e materiais extras para consolidar o conteúdo do próximo nível.' },
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
          { code: 'A1', name: 'Iniciante', desc: 'Primeiras palavras, verbo to be e apresentações.' },
          { code: 'A2', name: 'Básico', desc: 'Rotina, simple present e conversas do dia a dia.' },
          { code: 'B1', name: 'Intermediário', desc: 'Passado e futuro, opiniões e situações de viagem.' },
          { code: 'B2', name: 'Intermediário avançado', desc: 'Fluência em discussões, trabalho e estudo.' },
          { code: 'C1', name: 'Avançado', desc: 'Precisão, nuance e inglês profissional.' },
          { code: 'C2', name: 'Proficiente', desc: 'Domínio quase nativo em qualquer contexto.' },
        ],
      },
    }),

    createPanel({
      id: '04',
      type: 'plans',
      props: {
        kicker: 'Planos e valores',
        title: 'Quanto mais pratica, menos custa.',
        rows: [
          { freq: '1× semana', desc: '4 aulas por mês · individual', unit: 'R$ 50 /aula', price: 'R$ 200' },
          { freq: '2× semana', desc: '8 aulas por mês · individual', unit: 'R$ 40 /aula', price: 'R$ 320' },
          { freq: '3× semana', desc: '12 aulas por mês · individual', unit: 'R$ 33,33 /aula', price: 'R$ 400' },
          { freq: 'Dupla', desc: '2 alunos · valor reduzido por aluno', unit: 'por aluno', price: 'Consultar' },
          { freq: 'Grupo 3+', desc: '3 ou mais alunos · melhor custo-benefício', unit: 'por aluno', price: 'Consultar' },
          { freq: 'Avulsa', desc: 'Aula individual, sem plano mensal', unit: '1 hora', price: 'R$ 60' },
        ],
        note: '* Aulas de 1 hora · Dupla e grupo (3+) com valores reduzidos por aluno — consulte a combinação ideal no WhatsApp · Também aulas de Excel',
      },
    }),

    createPanel({
      id: '05',
      type: 'faq',
      props: {
        kicker: 'Dúvidas frequentes',
        title: 'Antes de começar.',
        items: [
          { q: 'A aula experimental é realmente grátis?', a: 'Sim. A primeira aula é gratuita e sem compromisso: serve para você conhecer o método, fazer o teste de nivelamento e definir seu plano de estudos.' },
          { q: 'As aulas são online ou presenciais?', a: 'As duas opções existem — você escolhe o formato que encaixa na sua rotina, e pode combinar os dois ao longo do plano.' },
          { q: 'O material didático está incluso?', a: 'Sim. O curso usa material bilíngue próprio, construído ao longo de anos de aula — você não precisa comprar livros separados.' },
          { q: 'Quanto tempo dura cada aula?', a: 'Cada aula tem 1 hora, e os planos mensais vão de 4 a 12 aulas por mês, conforme sua disponibilidade e objetivo.' },
          { q: 'Posso fazer aula com um amigo?', a: 'Sim: os planos de dupla e grupo (3 ou mais alunos) têm valores reduzidos por aluno — ideal para casais, amigos ou turmas de empresa.' },
          { q: 'Também ensina Excel?', a: 'Sim, além do inglês, o CEFF Education oferece aulas de Excel — no mesmo formato personalizado, online ou presencial.' },
        ],
      },
    }),

    createPanel({
      id: '06',
      type: 'cta',
      props: {
        kicker: 'Comece hoje',
        titleTop: 'Sua primeira',
        titleHighlight: 'aula',
        titleBottom: 'é grátis.',
        lede: 'Agende a aula experimental, faça o teste de nivelamento e receba um plano de estudos feito para você. Sem compromisso.',
        meta: 'Online · Presencial · Inglês e Excel',
      },
    }),
  ],
};
