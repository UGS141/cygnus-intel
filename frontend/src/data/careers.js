// ─────────────────────────────────────────────────────────────────
// CAREERS — single source of truth for the Careers page.
// Current content is SAMPLE content for design preview. Replace roles,
// areas and culture details with approved, real information before
// publishing. Do not present sample roles as live openings.
// ─────────────────────────────────────────────────────────────────

export const OPEN_ROLES = [
  {
    id: 'R.01',
    title: 'Senior AI Automation Engineer',
    area: 'Engineering (sample)',
    location: 'Remote-first, EU (sample)',
    type: 'Full-time (sample)',
    description:
      'Sample: own automation systems end to end — map client workflows, design human-in-the-loop routing, and ship systems that run reliably without supervision.',
  },
  {
    id: 'R.02',
    title: 'Research Engineer, Long-Horizon Systems',
    area: 'Research (sample)',
    location: 'Remote-first, EU (sample)',
    type: 'Full-time (sample)',
    description:
      'Sample: study planning and reasoning over long horizons — benchmarks, evaluation harnesses, and oversight experiments that feed directly into production work.',
  },
  {
    id: 'R.03',
    title: 'AI Integration Specialist',
    area: 'Client work (sample)',
    location: 'Hybrid — Ljubljana (sample)',
    type: 'Full-time (sample)',
    description:
      'Sample: wire intelligence into real stacks — permissions, data plumbing, edge cases, and the person on the night shift. The wiring is the work.',
  },
];

export const CAREER_AREAS = [
  {
    id: 'area-01',
    label: 'Engineering',
    description:
      'Sample: build the automation and intelligence systems clients depend on. Small teams, real ownership, production standards from day one.',
    roles: 'Automation Engineer · Integration Specialist (sample)',
  },
  {
    id: 'area-02',
    label: 'Research',
    description:
      'Sample: directed work toward long-horizon intelligence — evaluations, planning, oversight. Research that ships into practice.',
    roles: 'Research Engineer · Research Scientist (sample)',
  },
  {
    id: 'area-03',
    label: 'Operations',
    description:
      'Sample: keep a small, ambitious lab running — client operations, delivery, and the systems that support the systems.',
    roles: 'Operations Lead · Delivery Manager (sample)',
  },
];

export const CULTURE = [
  {
    label: 'How we work',
    detail: 'Sample: small teams, written decisions, weekly demos. We optimize for clarity over ceremony.',
  },
  {
    label: 'What we value',
    detail: 'Sample: honesty about what works, craft in the details, and patience with hard problems.',
  },
  {
    label: 'How we grow',
    detail: 'Sample: deep work is protected. Learning time is budgeted, and everyone presents internally once a quarter.',
  },
];
