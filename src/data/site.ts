export const siteConfig = {
  name: 'Naily Ashvitha',
  title: 'Naily Ashvitha — Full-Stack Developer',
  description:
    'Full-stack developer building polished, thoughtfully detailed digital products with clean architecture, strong UX, and careful implementation.',
  url: 'https://example.com',
  email: 'hello@example.com',
  location: 'Sri Lanka',
  links: {
    github: 'https://github.com/naily247',
    linkedin: 'https://www.linkedin.com/',
    resume: '/resume.pdf',
  },
} as const;

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Toolkit', href: '#toolkit' },
] as const;
