import alexAvatar from '@/assets/alex_sterling_avatar.jpg'

export const initialProfileData = {
  profile: {
    name: 'Alex Sterling',
    title: 'Senior Systems Architect • 12+ Years Exp.',
    email: 'alex.sterling@profilepage.io',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    avatar: alexAvatar,
  },
  bioText: 'Passionate technologist with over a decade of experience building scalable enterprise infrastructure. I specialize in bridging the gap between high-level architectural vision and ground-level execution. Currently focusing on open-source sustainability and collaborative R&D for next-generation network protocols.',
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'German', level: 'Fluent' },
    { name: 'Mandarin', level: 'Basic' },
  ],
  skills: [
    'Kubernetes',
    'Cloud Infrastructure',
    'Rust',
    'Distributed Systems',
    'Project Mentorship',
  ],
  activeTab: 'created',
  projectsList: {
    created: [
      {
        id: 'pc-1',
        title: 'Nexus Protocol',
        description: 'Decentralized node management for enterprise IoT',
        isPublic: true,
        iconType: 'network',
      },
      {
        id: 'pc-2',
        title: 'Internal Security Audit Tool',
        description: 'Automated penetration testing for local networks',
        isPublic: false,
        iconType: 'shield',
      },
    ],
    worked: [
      {
        id: 'pw-1',
        title: 'Hyperion Gateway',
        description: 'High-throughput edge message broker',
        isPublic: true,
        iconType: 'network',
      },
      {
        id: 'pw-2',
        title: 'Fortress Auth System',
        description: 'Zero-trust decentralized authentication service',
        isPublic: true,
        iconType: 'shield',
      },
    ],
    invested: [
      {
        id: 'pi-1',
        title: 'Aether Mesh Networks',
        description: 'Community-owned mesh WiFi routing hardware',
        isPublic: true,
        iconType: 'network',
      },
    ],
  },
  expertise: {
    level: 'SENIOR LEVEL',
    percentage: 85,
    subtitle: 'Top 5% in Systems Architecture for 2024',
  },
}
