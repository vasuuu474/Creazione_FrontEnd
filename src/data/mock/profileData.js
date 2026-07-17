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
    created: [],
    worked: [],
    invested: [],
    saved: [],
  },
  expertise: {
    level: 'SENIOR LEVEL',
    percentage: 85,
    subtitle: 'Top 5% in Systems Architecture for 2024',
  },
}
