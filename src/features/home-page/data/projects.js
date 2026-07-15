export const projects = [
  {
    id: 1,
    title: "Decentralized Energy Grid",
    description:
      "A peer-to-peer energy trading platform that allows households with solar panels to sell excess power directly to neighbors using blockchain technology.",
    category: ["BLOCKCHAIN", "OPEN SOURCE"],
    status: "open",
    members: 13,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    ],
    bookmarked: false,
    skillsNeeded: ["React", "Node.js", "Blockchain", "Solidity", "UI/UX"],
  },
  {
    id: 2,
    title: "AI Diagnosis for Remote Areas",
    description:
      "An AI-powered diagnostic tool designed for healthcare workers in underserved regions, providing preliminary assessments and treatment recommendations offline.",
    category: ["HEALTHTECH", "HIGH URGENCY"],
    status: "funded",
    members: 8,
    avatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    ],
    bookmarked: false,
    skillsNeeded: ["Python", "AI/ML", "TensorFlow", "React", "UI/UX"],
  },
  {
    id: 3,
    title: "Micro-Lending for Artists",
    description:
      "A fintech platform connecting emerging artists with micro-investors, enabling creative projects to secure funding through community-backed loans.",
    category: ["FINTECH", "SEED PHASE"],
    status: "open",
    members: 15,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop",
    ],
    bookmarked: false,
    skillsNeeded: ["Node.js", "React", "MongoDB", "Figma", "UI/UX"],
  },
  {
    id: 4,
    title: "Immersive History Lessons",
    description:
      "An edtech platform using VR and AR to bring historical events to life, making learning engaging for students in classrooms and at home.",
    category: ["EDTECH", "NON-PROFIT"],
    status: "prototype",
    members: 6,
    avatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    ],
    bookmarked: false,
    skillsNeeded: ["Unity", "React", "UI/UX", "3D Modeling", "TypeScript"],
  },
];

export const categories = [
  "Technology",
  "Design",
  "Finance",
  "Marketing",
  "Healthcare",
];

export const statusOptions = [
  { value: "open", label: "Open for collaboration" },
  { value: "funded", label: "Funded only" },
  { value: "prototype", label: "Prototype available" },
];

export const sortOptions = [
  { value: "trending", label: "Trending Now" },
  { value: "newest", label: "Newest" },
  { value: "most-joined", label: "Most Joined" },
];
