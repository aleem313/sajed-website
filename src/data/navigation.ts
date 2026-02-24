export const NAV_LINKS = {
  main: [{ label: "The Marketplace", href: "/marketplace" }],
  cta: { label: "Post a Free Ad", href: "/post-ad", requiresAuth: true },
  guest: [
    { label: "Create an Account", href: "/sign-up" },
    { label: "Sign In", href: "/sign-in", isModal: true },
  ],
  user: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Listings", href: "/dashboard/listings" },
    { label: "Messages", href: "/dashboard/messages" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
} as const;

export const FOOTER_LINKS = {
  marketplace: {
    title: "Marketplace",
    links: [
      { label: "The Marketplace", href: "/marketplace" },
      { label: "Create an Account", href: "/sign-up" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Partners", href: "/partners" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Our Mission", href: "/about-us#mission" },
      { label: "Community Projects", href: "/community-projects" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Video", href: "/about-us#video" },
      { label: "Contact Us", href: "/about-us#contact" },
      { label: "Our Blog", href: "/blog" },
      { label: "In the Press", href: "/press" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
} as const;
