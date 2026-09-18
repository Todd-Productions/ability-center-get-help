import { ReactNode } from "react";
import Link from "next/link";

import { Heart, LucideIcon } from "lucide-react";

import { cn } from "@/app/_lib/utils";

// Trimmed to what StepperSuccess + StepOneSection actually use:
// internal links only, solid style, gold/blue/orange, optional leading icon.
export type ButtonLinkTextColor = "white";
export type ButtonLinkButtonColor = "gold" | "blue" | "orange";

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  textColor?: ButtonLinkTextColor;
  buttonColor?: ButtonLinkButtonColor;
  showIcon?: boolean;
  icon?: LucideIcon;
}

const defaultText: Record<ButtonLinkButtonColor, string> = {
  gold: "text-black",
  blue: "text-white",
  orange: "text-white",
};

const textColorClass: Record<ButtonLinkTextColor, string> = {
  white: "text-white",
};

const bgClass: Record<ButtonLinkButtonColor, string> = {
  gold: "bg-brand-gold border-transparent hover:border-b-[color-mix(in_srgb,#ffc20e_70%,black)] hover:bg-[color-mix(in_srgb,#ffc20e_98%,black)]",
  blue: "bg-brand-light-blue border-transparent hover:border-b-[color-mix(in_srgb,#3777bc_50%,black)] hover:bg-[color-mix(in_srgb,#3777bc_90%,black)]",
  orange:
    "bg-brand-orange border-transparent hover:border-b-[color-mix(in_srgb,#f26522_60%,black)] hover:bg-[color-mix(in_srgb,#f26522_90%,black)]",
};

const ButtonLink = (props: ButtonLinkProps) => {
  const {
    href,
    children,
    textColor,
    buttonColor = "gold",
    showIcon = true,
    icon: Icon = Heart,
  } = props;

  const resolvedTextColor = textColor
    ? textColorClass[textColor]
    : defaultText[buttonColor];

  return (
    <Link
      href={href}
      className={cn(
        "button-link group flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-md font-[600] transition-all hover:scale-105 xl:text-lg",
        resolvedTextColor,
        bgClass[buttonColor],
      )}
    >
      {showIcon && (
        <span className="order-first !mt-1 inline-block">
          <Icon className="transition-all group-hover:scale-105" size={18} />
        </span>
      )}
      <span>{children}</span>
    </Link>
  );
};

export default ButtonLink;
