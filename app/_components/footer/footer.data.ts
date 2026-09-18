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
  { label: "Twitter", href: "https://twitter.com/abilitycntr", icon: "twitter" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/abilitycenter",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-ability-center-of-greater-toledo/",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/abilitycentertoledo",
    icon: "youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/abilitycenter/",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@theabilitycentertoledo",
    icon: "tiktok",
  },
];

export type BadgeLink = {
  label: string;
  href: string;
  src: string;
  /** intrinsic pixel size, for aspect-ratio reservation */
  width: number;
  height: number;
  /** rendered max width in px */
  displayWidth: number;
};

export const badges: BadgeLink[] = [
  {
    label: "BBB Torch Awards for Ethics 2023 Winner",
    href: "#",
    src: "/footer/footer-torch-awards.jpg",
    width: 339,
    height: 284,
    displayWidth: 339,
  },
  {
    label: "Candid Platinum Transparency 2026",
    href: "#",
    src: "/footer/footer-platinum-transparency.svg",
    width: 108,
    height: 108,
    displayWidth: 108,
  },
];

export const legalLinks = [
  // TODO: confirm the real privacy-policy path on the marketing site
  { label: "Privacy Policy", href: externalUrl("/privacy-policy") },
];

export const organizationName = "The Ability Center";
