export const initialProjectData = {
  title: "System Architecture & Infrastructure",
  parentProject: "Project Alpha",
  parentSubtitle: "Enterprise Infrastructure",
  phase: "DEPLOYMENT",
  updatedText: "Updated 2h ago",
  scopeTitle: "",
  scopeParagraphs: [
    "Project Alpha is our flagship enterprise infrastructure overhaul aimed at migrating legacy on-premise systems to a highly scalable, multi-cloud environment. The core focus is on 99.99% availability, automated failover mechanisms, and zero-trust security architecture.",
    "Our current sprint focuses on the orchestration layer using Kubernetes clusters across three geographic regions. We are integrating advanced telemetry and monitoring to ensure real-time visibility into microservices health and latency metrics."
  ],
  scopeBullets: [
    "Multi-cloud redundancy (AWS & Azure integration)",
    "Real-time data synchronization at sub-50ms latency",
    "Dynamic resource scaling based on predictive AI models"
  ],
  founder: {
    name: "Dr. Aris Thorne",
    role: "Chief Architect",
    avatar: "/src/assets/founder_aris.jpg",
    email: "aris.thorne@creazione.com"
  },
  members: [
    {
      id: "1",
      name: "Marcus Chen",
      role: "DevOps Lead",
      avatar: "/src/assets/member_marcus.jpg",
      tag: "Cloud Migration"
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      role: "UX Strategy",
      avatar: "/src/assets/member_sarah.jpg",
      tag: "Component Audit"
    }
  ],
  totalMembersCount: 8,
  tags: ["KUBERNETES", "TERRAFORM", "REACT", "POSTGRESQL", "ZEROTRUST"]
};

export const allMockMembers = [
  {
    id: "1",
    name: "Marcus Chen",
    role: "DevOps Lead",
    avatar: "/src/assets/member_marcus.jpg",
    tag: "Cloud Migration"
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    role: "UX Strategy",
    avatar: "/src/assets/member_sarah.jpg",
    tag: "Component Audit"
  },
  {
    id: "3",
    name: "Elena Rostova",
    role: "Security Engineer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
    tag: "Penetration Testing"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Backend Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    tag: "API Gateway"
  },
  {
    id: "5",
    name: "Aisha Rahman",
    role: "Data Engineer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
    tag: "Pipeline Dev"
  },
  {
    id: "6",
    name: "Liam O'Connor",
    role: "Site Reliability Eng",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    tag: "SLA Optimization"
  },
  {
    id: "7",
    name: "Sophia Martinez",
    role: "QA Lead",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=120",
    tag: "E2E Testing"
  },
  {
    id: "8",
    name: "Dr. Aris Thorne",
    role: "Chief Architect",
    avatar: "/src/assets/founder_aris.jpg",
    tag: "Founding Advisor"
  }
];
