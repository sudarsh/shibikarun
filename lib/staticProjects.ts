export interface StaticProject {
  id: string;
  title: string;
  client: string;
  category: string;
  year: number;
  slug: string;
  coverImage: string;
  gallery: string[];
  concept: string;
  featured: boolean;
}

export const staticProjects: StaticProject[] = [
  {
    id: "apexion",
    title: "Apexion",
    client: "Apexion",
    category: "Brand Identity",
    year: 2023,
    slug: "apexion",
    coverImage: "/work/apexion/thumb.jpg",
    gallery: ["/work/apexion/1.jpg", "/work/apexion/2.jpg"],
    concept:
      "A sharp, forward-looking identity for a consulting firm that needed to signal precision and growth.",
    featured: true,
  },
  {
    id: "chaat",
    title: "Chaat",
    client: "Chaat Restaurant",
    category: "Brand Identity",
    year: 2023,
    slug: "chaat",
    coverImage: "/work/chaat/thumb.jpg",
    gallery: [
      "/work/chaat/1.jpg",
      "/work/chaat/2.jpg",
      "/work/chaat/3.jpg",
    ],
    concept:
      "Vibrant, street-food energy translated into a cohesive visual language — bold colours, expressive type, and a nod to the chaos and joy of Indian street food.",
    featured: true,
  },
  {
    id: "finecut",
    title: "Finecut",
    client: "Finecut",
    category: "Brand Identity",
    year: 2022,
    slug: "finecut",
    coverImage: "/work/finecut/thumb.jpg",
    gallery: ["/work/finecut/1.jpg", "/work/finecut/2.jpg"],
    concept:
      "Minimal, confident branding for a premium tailoring studio. Every detail considered — like the cuts themselves.",
    featured: true,
  },
  {
    id: "flynok",
    title: "FlyNok",
    client: "FlyNok",
    category: "Brand Identity",
    year: 2023,
    slug: "flynok",
    coverImage: "/work/flynok/thumb.jpg",
    gallery: [
      "/work/flynok/1.jpg",
      "/work/flynok/2.jpg",
      "/work/flynok/3.jpg",
    ],
    concept:
      "A travel brand identity built around movement, freedom and discovery. Clean forms with a sense of lift.",
    featured: true,
  },
  {
    id: "grand-cascade",
    title: "Grand Cascade",
    client: "Grand Cascade",
    category: "Brand Identity",
    year: 2022,
    slug: "grand-cascade",
    coverImage: "/work/grand-cascade/thumb.jpg",
    gallery: ["/work/grand-cascade/1.jpg", "/work/grand-cascade/2.jpg"],
    concept:
      "Hospitality branding that balances grandeur and warmth — a mark that feels both luxurious and approachable.",
    featured: false,
  },
  {
    id: "grand-mart",
    title: "Grand Mart",
    client: "Grand Mart",
    category: "Brand Identity",
    year: 2022,
    slug: "grand-mart",
    coverImage: "/work/grand-mart/thumb.jpg",
    gallery: [
      "/work/grand-mart/1.jpg",
      "/work/grand-mart/2.jpg",
      "/work/grand-mart/3.jpg",
    ],
    concept:
      "Retail identity system designed for high visibility and family appeal — bold, friendly and instantly recognisable.",
    featured: false,
  },
  {
    id: "gurumudra",
    title: "Gurumudra",
    client: "Gurumudra",
    category: "Brand Identity",
    year: 2021,
    slug: "gurumudra",
    coverImage: "/work/gurumudra/thumb.jpg",
    gallery: ["/work/gurumudra/1.jpg"],
    concept:
      "A cultural institution mark rooted in gesture and meaning — the mudra as metaphor for teaching and transmission.",
    featured: false,
  },
  {
    id: "jumbo-rooms",
    title: "Jumbo Rooms",
    client: "Jumbo Rooms",
    category: "Brand Identity",
    year: 2023,
    slug: "jumbo-rooms",
    coverImage: "/work/jumbo-rooms/thumb.jpg",
    gallery: ["/work/jumbo-rooms/1.jpg", "/work/jumbo-rooms/2.jpg"],
    concept:
      "Budget hospitality with character. The identity leans into the playful side of travel — big personality, honest pricing.",
    featured: false,
  },
  {
    id: "laksyah",
    title: "Laksyah",
    client: "Laksyah",
    category: "Brand Identity",
    year: 2022,
    slug: "laksyah",
    coverImage: "/work/laksyah/thumb.jpg",
    gallery: ["/work/laksyah/1.jpg", "/work/laksyah/2.jpg"],
    concept:
      "Purpose-driven branding for a wellness brand — rooted in traditional knowledge, expressed through a clean contemporary lens.",
    featured: false,
  },
  {
    id: "weekend",
    title: "Weekend Blockbusters",
    client: "Weekend Blockbusters",
    category: "Editorial",
    year: 2023,
    slug: "weekend",
    coverImage: "/work/weekend/thumb.jpg",
    gallery: ["/work/weekend/1.jpg", "/work/weekend/2.jpg"],
    concept:
      "Event branding for a cinema series — high energy, cinematic scale, designed to own the weekend.",
    featured: false,
  },
];

export const featuredProjects = staticProjects.filter((p) => p.featured);
