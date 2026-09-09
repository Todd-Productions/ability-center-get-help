import { externalUrl } from "@/app/_lib/externalUrl";

/**
 * Footer content / configuration.
 *
 * NOTE: paths passed to `externalUrl()` are placeholders — swap them for the
 * real slugs once provided. Fully third-party links (social, award badges)
 * are absolute and currently stubbed with "#".
 */

export type Office = {
  name: string;
  lines: string[];
};

export const offices: Office[] = [
  {
    name: "The Ability Center",
    lines: ["5605 Monroe Street", "Sylvania, OH 43560"],
  },
  {
    name: "Bryan Satellite Office",
    lines: ["1425 East High Street, Suite 105", "Bryan, OH 43506"],
  },
];

export const contact = {
  phone: "419-885-5733",
  fax: "419-882-4813",
  // TODO: confirm the real contact path on the marketing site
  ctaHref: externalUrl("/contact-us"),
};

export type SocialLink = {
  label: string;
  href: string;
  /** key into the icon map in social-icons.tsx */
  icon: "twitter" | "facebook" | "linkedin" | "youtube" | "instagram" | "tiktok";
};

export const socialLinks: SocialLink[] = [
  { label: "Twitter", href: "#", icon: "twitter" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "TikTok", href: "#", icon: "tiktok" },
];

export type BadgeLink = {
  label: string;
  href: string;
  src: string;
  width: number;
  height: number;
};

export const badges: BadgeLink[] = [
  {
    label: "BBB Torch Awards for Ethics 2023 Winner",
    href: "#",
    src: "/footer/bbb-torch-award.svg",
    width: 340,
    height: 300,
  },
  {
    label: "Candid Platinum Transparency 2026",
    href: "#",
    src: "/footer/candid-seal.svg",
    width: 150,
    height: 180,
  },
];

export const legalLinks = [
  // TODO: confirm the real privacy-policy path on the marketing site
  { label: "Privacy Policy", href: externalUrl("/privacy-policy") },
];

export const organizationName = "The Ability Center";
