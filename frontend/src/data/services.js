// ─────────────────────────────────────────────────────────────────
// SERVICES — single source of truth for the four service pages.
// Each service has its own page at /services/<slug>.
// `detail` currently holds SAMPLE engagement copy — replace with
// approved offerings before publishing.
// accent: one brand color per page (gold, bright blue, teal, coral).
// visual: which animated SVG scene the hero shows.
// layout: which side the hero visual sits on at desktop.
// ─────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    slug: 'ai-automation',
    n: '01',
    title: 'AI Automation',
    accent: '#FA9720',
    tagline: 'Machines that take real work off human hands.',
    visual: 'orbit',
    layout: 'right',
    texture: 'grid',
    what: 'AI Automation is the practice of finding work that follows a pattern — the handoffs, the data entry, the monitoring, the follow-ups — and building systems that do it the way a careful person would: faster, without fatigue, and with a clear record of what happened.',
    problem: 'Most teams lose their best hours to work that needs doing but not deciding. It repeats, it interrupts, and it scales badly — the busier the organization, the more of it there is.',
    approach: 'We start by watching the work as it actually happens, then automate the narrowest reliable slice first. Every automated step keeps a human checkpoint where judgment matters, and every run leaves a trail that can be audited.',
    connection: 'Automation is where intelligence earns trust. A system that reliably does small, real work is the foundation for systems that can one day plan and reason over longer horizons.',
    detail: 'Sample: typical engagement is a 6–12 week pilot — fixed scope, human-in-the-loop throughout, measured against the original problem.',
  },
  {
    slug: 'applied-intelligence',
    n: '02',
    title: 'Applied Intelligence',
    accent: '#0287DF',
    tagline: 'Decisions with their reasoning attached.',
    visual: 'plot',
    layout: 'left',
    texture: 'dots',
    what: 'Applied Intelligence means building systems that read a situation, surface what matters, and explain themselves — decision support and analysis that people can question, audit and correct.',
    problem: 'Important information rarely arrives in one place or one shape. The cost of a decision is often the hours spent assembling the picture, not making the call.',
    approach: 'We design for legibility first: every output can be traced to its inputs, and every recommendation can be challenged. The person accountable for the outcome stays in charge of it.',
    connection: 'Readable reasoning is the bridge between today’s tools and trustworthy advanced intelligence — the habit that makes bigger systems safe to build.',
    detail: 'Sample: typical engagement is a decision-support interface piloted with one team, then widened as trust is earned.',
  },
  {
    slug: 'systems-integration',
    n: '03',
    title: 'Systems Integration',
    accent: '#01A498',
    tagline: 'Intelligence, wired into the stack you already run.',
    visual: 'tracks',
    layout: 'right',
    texture: 'tracks',
    what: 'Systems Integration brings AI into the tools, data and workflows an organization already uses — permissions, edge cases, the person on the night shift included.',
    problem: 'The hard part of AI is rarely the model. It is the wiring: scattered data, mismatched tools, and processes that live in people’s heads.',
    approach: 'We map the whole system before we touch it, connect the smallest useful path first, and design for the constraints that only appear in production.',
    connection: 'Integration is how intelligence becomes infrastructure — the difference between a demo and a capability an organization can depend on.',
    detail: 'Sample: typical engagement connects one useful path in weeks — never a platform rewrite.',
  },
  {
    slug: 'long-horizon-research',
    n: '04',
    title: 'Long-Horizon Research',
    accent: '#FB5040',
    tagline: 'Careful steps toward intelligence that can plan further ahead.',
    visual: 'horizon',
    layout: 'left',
    texture: 'plain',
    what: 'Long-Horizon Research is our directed effort toward advanced general intelligence — studying how systems plan, reason and act over longer stretches of time.',
    problem: 'Capability is compounding faster than our understanding of how to direct it. The field needs sober engineering more than it needs slogans.',
    approach: 'We treat alignment, oversight and reversibility as engineering requirements from the first prototype, and we hold a plain standard: if we cannot explain what a system does, we do not deploy it.',
    connection: 'Every automation and intelligence system we ship teaches us something about the longer path — research and practice inform each other.',
    detail: 'Sample: focus areas include long-horizon planning, evaluation, and oversight mechanisms; selected results are shared with collaborators.',
  },
];
