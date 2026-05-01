export interface SocialLink {
  readonly label: string;
  readonly shortLabel: string;
  readonly href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: 'Instagram',
    shortLabel: 'IG',
    href: 'https://www.instagram.com/miyabayashi_koya',
  },
  {
    label: 'X',
    shortLabel: 'X',
    href: 'https://x.com/koya_1104',
  },
  {
    label: 'note',
    shortLabel: 'NOTE',
    href: 'https://note.com/koyablog1104',
  },
  {
    label: 'GitHub',
    shortLabel: 'GH',
    href: 'https://github.com/pro-koya',
  },
] as const;
