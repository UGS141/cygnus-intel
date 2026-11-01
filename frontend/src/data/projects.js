// ─────────────────────────────────────────────────────────────────
// SIGNAL ATLAS — PROJECT DATA (single source of truth)
//
// Current content is SAMPLE content for design preview — every entry
// keeps `sample: true` (the visible SAMPLE badge) and outcomes carry
// an inline "Sample:" prefix. Replace fields with verified details,
// then set `sample: false` only when the entry is real and approved.
// ─────────────────────────────────────────────────────────────────

export const SAMPLE_PROJECTS = [
  {
    id: 'P.01',
    sample: true,
    title: 'Workflow Intelligence',
    category: 'AI automation',
    client: 'Internal pilot program (sample)',
    challenge:
      'Repeated manual handoffs can make everyday workflows harder to manage.',
    contribution:
      'Map a workflow, identify useful automation opportunities, and design AI-assisted routing with human review for exceptions.',
    outcome:
      'Sample: weekly reporting handoffs dropped from ~6 hours to ~40 minutes in the pilot workflow.',
    tools: 'Python, LangGraph, Postgres, internal APIs (sample stack)',
  },
  {
    id: 'P.02',
    sample: true,
    title: 'Decision Brief',
    category: 'Decision intelligence',
    client: 'Internal pilot program (sample)',
    challenge:
      'Relevant information may be spread across multiple sources, making it difficult to form a clear view.',
    contribution:
      'Design a human-reviewed intelligence interface that brings relevant information together to support decisions.',
    outcome:
      'Sample: analysts assembled a complete decision brief in about an hour instead of a full day.',
    tools: 'React, FastAPI, pgvector, Claude API (sample stack)',
  },
  {
    id: 'P.03',
    sample: true,
    title: 'Connected Operations',
    category: 'Integration',
    client: 'Internal pilot program (sample)',
    challenge:
      'Separate tools can make it difficult to move information through a process consistently.',
    contribution:
      'Explore an integration approach that connects existing tools and adds automation where appropriate.',
    outcome:
      'Sample: order data moved between three systems with zero manual re-entry during the pilot.',
    tools: 'Node.js, webhooks, message queues, ERP APIs (sample stack)',
  },
];
