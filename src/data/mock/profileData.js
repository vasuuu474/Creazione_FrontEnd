import defaultPfp from '@/assets/default_pfp.png'

export const initialProfileData = {
  profile: {
    name: 'New User',
    title: 'Senior Systems Architect • 12+ Years Exp.',
    email: 'newuser@creazione.com',
    phone: '',
    location: '',
    avatar: defaultPfp,
  },
  bioText: '',
  languages: [],
  skills: [],
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
    saved: [],
  },
  expertise: {
    level: 'SENIOR LEVEL',
    percentage: 85,
    subtitle: 'Top 5% in Systems Architecture for 2024',
  },
}
