import { externalUrl } from "@/app/_lib/externalUrl";

/**
 * Primary navigation — mirrors the live abilitycenter.org menu.
 *
 * Same-site links go through `externalUrl()` (prefixed with
 * `NEXT_PUBLIC_SITE_URL`); genuinely off-domain links are absolute and flagged
 * `external` so they open in a new tab.
 *
 * A nav item may carry a `menu`:
 *  - `single` — one vertical list of links (regular dropdown, e.g. Events).
 *  - `mega`   — full-width panel of heading + link columns.
 *
 * Top-level items that are pure dropdown triggers have `href: "#"` — on the
 * live site their `<a>` has no href at all.
 */
export type NavLeaf = {
  label: string;
  href: string;
  /** off-domain (or a file) — open in a new tab */
  external?: boolean;
};

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
  /** rendered brighter at rest */
  emphasized?: boolean;
  menu?: NavMenu;
};

const ext = externalUrl;

export const navItems: NavItem[] = [
  {
    label: "About",
    href: "#",
    menu: {
      type: "mega",
      columns: [
        {
          heading: "About Us",
          headingHref: ext("/about-us/"),
          items: [
            {
              label: "Community Investment Initiative",
              href: ext("/capital-project/"),
            },
            { label: "Annual Report", href: ext("/annual-report/") },
            {
              label: "IRS Form 990",
              href: ext(
                "/wp-content/uploads/2025/07/ACT-990-9-30-2024-signed.approved.bw_.pdf",
              ),
              external: true,
            },
            { label: "Request a Speaker", href: ext("/request-a-speaker/") },
          ],
        },
        {
          heading: "People",
          items: [
            { label: "Success Stories", href: ext("/success-stories/") },
            { label: "Our Team", href: ext("/our-team/") },
            { label: "Careers", href: ext("/careers/") },
          ],
        },
        {
          heading: "Board of Trustees",
          headingHref: ext("/board-of-trustees/"),
          items: [
            {
              label: "Board Application Form",
              href: ext("/board-of-trustees/#application"),
            },
          ],
        },
        {
          heading: "Support",
          items: [
            { label: "Donate", href: ext("/donate/") },
            { label: "Volunteering", href: ext("/volunteering/") },
            {
              label: "Sponsorship Opportunities",
              href: ext("/sponsorship-opportunities/"),
            },
          ],
        },
      ],
    },
  },
  {
    label: "Services",
    href: "#",
    menu: {
      type: "mega",
      columns: [
        {
          heading: "Advocacy",
          headingHref: ext("/advocacy/"),
          items: [
            { label: "Housing", href: ext("/housing/") },
            {
              label: "Employment Training Program",
              href: ext("/employment-training/"),
            },
            { label: "Toolkit", href: ext("/toolkit/") },
            {
              label: "Transportation Search (AOA)",
              href: "https://areaofficeonaging.com/transportation-search",
              external: true,
            },
            {
              label: "Housing Search (AOA)",
              href: "https://areaofficeonaging.com/housing-search",
              external: true,
            },
          ],
        },
        {
          heading: "Assistance Dogs",
          headingHref: ext("/assistance-dogs/"),
          items: [
            { label: "Our Assistance Dogs", href: ext("/assistance-dogs/") },
            {
              label: "Apply for a Dog",
              href: "https://form.jotform.com/260415341404041",
              external: true,
            },
            { label: "Agility Program", href: ext("/agility-angels/") },
            { label: "Volunteering", href: ext("/volunteering/") },
            { label: "Puppy Raise or Foster", href: ext("/volunteering/") },
            { label: "Puppy Sponsor", href: ext("/puppy-naming/") },
          ],
        },
        {
          heading: "Independent Living",
          headingHref: ext("/independent-living/"),
          items: [
            { label: "Youth and Family", href: ext("/youth-family-services/") },
            {
              label: "Teen and Adults",
              href: ext("/independent-living/#teens-and-youths"),
            },
            { label: "Lending Closet", href: ext("/lending-closet/") },
            { label: "Scholarship", href: ext("/scholarship/") },
          ],
        },
        {
          heading: "Navigators",
          headingHref: ext("/navigators/"),
          items: [
            {
              label: "Assistive Tech/Medical Equipment",
              href: ext("/assistive-tech-medical-equipment/"),
            },
            {
              label: "Northwest Ohio Medical Supply Closet",
              href: ext("/medical-supply-closet/"),
            },
            { label: "Stroke Group", href: ext("/stroke-group/") },
          ],
        },
        {
          heading: "Home Accessibility",
          headingHref: ext("/home-accessibility/"),
          items: [
            {
              label: "Our Projects",
              href: ext("/home-accessibility/#projects"),
            },
            {
              label: "Temporary Ramp Program",
              href: ext("/home-accessibility/#temp-ramps"),
            },
          ],
        },
      ],
    },
  },
  {
    label: "News",
    href: "#",
    menu: {
      type: "mega",
      columns: [
        { heading: "Blog", headingHref: ext("/blog/"), items: [] },
        {
          heading: "Newsroom",
          headingHref: ext("/newsroom/"),
          items: [
            { label: "Request a Speaker", href: ext("/request-a-speaker/") },
          ],
        },
        {
          heading: "Video Library",
          headingHref: ext("/video-library/"),
          items: [],
        },
        {
          heading: "Media Requests",
          headingHref: ext("/media-requests/"),
          items: [
            {
              label: "Download Logo",
              href: ext(
                "/wp-content/uploads/2022/07/act-horizontal-full-color-rgb.png",
              ),
              external: true,
            },
            {
              label: "Brand Standards",
              href: ext(
                "/wp-content/uploads/2022/07/TheAbilityCenter_BrandStandardsManual_v1.pdf",
              ),
              external: true,
            },
          ],
        },
      ],
    },
  },
  {
    label: "Events",
    href: ext("/events/"),
    menu: {
      type: "single",
      items: [
        { label: "Upcoming Events", href: ext("/events/") },
        {
          label: "Sponsorship Opportunities",
          href: ext("/sponsorship-opportunities/"),
        },
        { label: "Access Summit", href: ext("/summit/") },
        { label: "Assistance Dogs Graduation", href: ext("/graduation/") },
        { label: "Family Fun Day", href: ext("/family-fun-day/") },
      ],
    },
  },
  { label: "Apply for a Dog", href: ext("/assistance-dogs/") },
  {
    label: "Contact",
    href: "#",
    menu: {
      type: "mega",
      columns: [
        { heading: "Contact Us", headingHref: ext("/contact-us/"), items: [] },
        {
          heading: "Request a Speaker",
          headingHref: ext("/request-a-speaker/"),
          items: [],
        },
        {
          heading: "Subscribe to Email List",
          headingHref: ext("/email-newsletter-sign-up/"),
          items: [],
        },
      ],
    },
  },
];

/** Standalone call-to-action, rendered as a button beside the search icon. */
export const give = { label: "Give", href: ext("/donate/") };

export const searchHref = ext("/search");
