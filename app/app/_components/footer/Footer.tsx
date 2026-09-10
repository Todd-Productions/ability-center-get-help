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
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-[1400px] py-16">
        <div className="flex flex-col items-center gap-14 text-center lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* Offices */}
          <div className="flex flex-col items-center gap-6">
            {offices.map((office) => (
              <div key={office.name}>
                <h3 className="text-[26px]">{office.name}</h3>
                {office.lines.map((line) => (
                  <p key={line} className="mt-1 text-[18px] text-white">
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
                className="block w-full"
                style={{ maxWidth: badge.displayWidth }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={badge.src}
                  alt={badge.label}
                  width={badge.width}
                  height={badge.height}
                  className="h-auto w-full"
                />
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-6">
            <div className="text-[26px]">
              <p>
                Phone:{" "}
                <a href={telHref} className="hover:underline">
                  {contact.phone}
                </a>
              </p>
              <p className="-mt-2">Fax: {contact.fax}</p>
            </div>

            <a
              href={contact.ctaHref}
              className="inline-block rounded bg-brand-gold px-6 py-5 text-[18px] tracking-wide text-brand-navy transition-colors hover:bg-brand-gold-hover"
            >
              CONTACT US
            </a>

            {/* <div>
              <h3 className="text-xl font-bold">Translate This Site</h3>
              <TranslateWidget />
            </div> */}
          </div>
        </div>

        {/* Social */}
        <ul className="mt-42 flex flex-wrap justify-center gap-5">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group inline-flex h-[50px] w-[50px] items-center justify-center rounded-full border hover:border-2 border-white/25 text-white/60 transition-colors hover:border-white hover:text-white"
                >
                  <Icon className="text-[#969696] group-hover:text-white" />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Legal */}
        <div className="mt-7 space-y-1 text-center text-[14px] text-[#969696]">
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
