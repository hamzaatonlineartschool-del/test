export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Short label for badges */
  category: string;
  image: string;
  /** ISO date for <time dateTime> */
  dateIso: string;
  /** Display string, e.g. "Apr 12, 2026" */
  date: string;
  readMinutes: number;
  /** Optional longer body for article pages */
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "planning-a-world-class-refit",
    title: "Planning a world-class refit without losing momentum",
    excerpt:
      "How owners align yard slots, specialists, and sea trials so the program stays transparent from concept to handover.",
    category: "Refit",
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=85",
    dateIso: "2026-03-28",
    date: "Mar 28, 2026",
    readMinutes: 6,
    body: [
      "A successful refit is less about a single hero moment and more about disciplined sequencing: specifications that survive survey, partners who document as they build, and milestones that stay visible when weather and supply chains do not cooperate.",
      "We recommend a single technical lead across disciplines so AV, interior, and machinery changes do not fight for the same access windows — especially when the yacht is away from its home yard.",
    ],
  },
  {
    slug: "engine-room-care-at-sea",
    title: "Engine-room care that holds up when it matters at sea",
    excerpt:
      "OEM-aligned service, diagnostics, and documentation — so crew and owners share one clear picture of machinery health.",
    category: "Machinery",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=85",
    dateIso: "2026-04-02",
    date: "Apr 2, 2026",
    readMinutes: 5,
    body: [
      "High-hour operations reward consistency: fluid analysis on a real schedule, thermal checks after load changes, and logbooks that the next watch can actually read.",
      "When something does spike, aligned diagnostics mean you are replacing components on evidence — not on guesswork.",
    ],
  },
  {
    slug: "interior-craftsmanship-onboard",
    title: "Interior craftsmanship that defines onboard luxury",
    excerpt:
      "Marine-grade joinery, veneers, and finishing that respect motion, climate, and the way owners actually live at anchor.",
    category: "Interiors",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85",
    dateIso: "2026-04-09",
    date: "Apr 9, 2026",
    readMinutes: 7,
    body: [
      "Luxury interiors on yachts are a balance of aesthetics and physics: materials that tolerate humidity cycles, hardware that stays quiet underway, and lighting that feels warm after sunset without washing out navigation zones.",
      "Custom woodwork should be specified with grain direction, fastening, and service access in mind — not only the first photo shoot.",
    ],
  },
  {
    slug: "classification-without-surprises",
    title: "Classification and surveys without last-minute surprises",
    excerpt:
      "What to prepare before the survey window — from documentation to witness tests — so renewals feel routine, not reactive.",
    category: "Compliance",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    dateIso: "2026-04-14",
    date: "Apr 14, 2026",
    readMinutes: 8,
    body: [
      "Survey readiness is a project: drawings current, modifications recorded, and safety systems exercised before the class surveyor boards.",
      "When teams rehearse findings and responses in advance, owners avoid the costly loop of return visits and berth delays.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
