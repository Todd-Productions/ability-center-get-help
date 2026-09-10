import { externalUrl } from "@/app/_lib/externalUrl";

/**
 * Primary navigation.
 *
 * Slugs are placeholders — swap for the real marketing-site paths once provided.
 *
 * A nav item may carry a `menu`:
 *  - `single` — one vertical list of links (regular dropdown).
 *  - `mega`   — full-width panel of heading + link columns, laid out
 *               `justify-between` (see the "About" item / design ref).
 */
export type NavLeaf = { label: string; href: string };

export type NavColumn = {
  heading: string;
  /** optional link on the column heading itself */
  headingHref?: string;
  items: NavLeaf[];
};

export type NavMenu =
  | { type: "single"; items: NavLeaf[] }
  | { type: "mega"; columns: NavColumn[] };

export type NavItem = {
  label: string;
  href: string;
  /** rendered brighter at rest, e.g. the "Give" link */
  emphasized?: boolean;
  menu?: NavMenu;
};

const ext = externalUrl;

export const navItems: NavItem[] = [
  {
    label: "About",
    href: ext("/about"),
    menu: {
      type: "mega",
      columns: [
        {
          heading: "About Us",
          headingHref: ext("/about"),
          items: [
            {
              label: "Community Investment Initiative",
              href: ext("/about/community-investment-initiative"),
            },
            { label: "Annual Report", href: ext("/about/annual-report") },
            { label: "IRS Form 990", href: ext("/about/irs-form-990") },
            { label: "Request a Speaker", href: ext("/about/request-a-speaker") },
          ],
        },
        {
          heading: "People",
          headingHref: ext("/about/people"),
          items: [
            { label: "Success Stories", href: ext("/about/success-stories") },
            { label: "Our Team", href: ext("/about/our-team") },
            { label: "Careers", href: ext("/careers") },
          ],
        },
        {
          heading: "Board Of Trustees",
          headingHref: ext("/about/board-of-trustees"),
          items: [
            {
              label: "Board Application Form",
              href: ext("/about/board-application-form"),
            },
          ],
        },
        {
          heading: "Support",
          headingHref: ext("/support"),
          items: [
            { label: "Donate", href: ext("/donate") },
            { label: "Volunteering", href: ext("/volunteering") },
            {
              label: "Sponsorship Opportunities",
              href: ext("/sponsorship-opportunities"),
            },
          ],
        },
      ],
    },
  },
  {
    label: "Services",
    href: ext("/services"),
    menu: {
      type: "single",
      items: [
        { label: "Assistance Dogs", href: ext("/services/assistance-dogs") },
        {
          label: "Home Accessibility",
          href: ext("/services/home-accessibility"),
        },
        { label: "Equipment Loan", href: ext("/services/equipment-loan") },
        { label: "Advocacy", href: ext("/services/advocacy") },
      ],
    },
  },
  { label: "News", href: ext("/news") },
  { label: "Events", href: ext("/events") },
  { label: "Apply for a Dog", href: ext("/apply-for-a-dog") },
  { label: "Contact", href: ext("/contact-us") },
  { label: "Give", href: ext("/give"), emphasized: true },
];

export const searchHref = ext("/search");
