import { TranslateWidget } from "./TranslateWidget";
import {
  badges,
  contact,
  legalLinks,
  offices,
  organizationName,
  socialLinks,
} from "./footer.data";
import { socialIcons } from "./social-icons";

export function Footer() {
  const year = new Date().getFullYear();
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="bg-[#0a2547] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-14 text-center lg:grid-cols-3 lg:items-start lg:gap-8">
          {/* Offices */}
          <div className="space-y-6">
            {offices.map((office) => (
              <div key={office.name}>
                <h3 className="text-xl font-bold">{office.name}</h3>
                {office.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-white/85">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Award badges */}
          <div className="flex flex-col items-center gap-6">
            {badges.map((badge) => (
              <a
                key={badge.label}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={badge.src}
                  alt={badge.label}
                  width={badge.width}
                  height={badge.height}
                  className="h-auto w-auto max-w-full"
                />
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <div className="space-y-1 text-lg">
              <p>
                Phone:{" "}
                <a href={telHref} className="hover:underline">
                  {contact.phone}
                </a>
              </p>
              <p>Fax: {contact.fax}</p>
            </div>

            <a
              href={contact.ctaHref}
              className="inline-block rounded bg-[#f5b400] px-6 py-3 text-sm font-semibold tracking-wide text-[#0a2547] transition-colors hover:bg-[#e0a400]"
            >
              CONTACT US
            </a>

            <div>
              <h3 className="text-xl font-bold">Translate This Site</h3>
              <TranslateWidget />
            </div>
          </div>
        </div>

        {/* Social */}
        <ul className="mt-16 flex flex-wrap justify-center gap-4">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/60 transition-colors hover:border-white hover:text-white"
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Legal */}
        <div className="mt-10 space-y-1 text-center text-xs text-white/55">
          <p>
            &copy; {year} {organizationName}. All Rights Reserved.
          </p>
          <p>
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="uppercase tracking-wide hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
