import { FC, ReactNode } from "react";

import { cn } from "@/app/_lib/utils";

export type HeadingTextColor = "black" | "white" | "navy";

export interface HeadingProps {
  variant?: "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  textSize?: "default" | "large" | "md" | "sm";
  textCenter?: boolean;
  textColor?: HeadingTextColor;
  disablePadding?: boolean;
}

const sizeClass: Record<NonNullable<HeadingProps["textSize"]>, string> = {
  default: "text-4xl md:text-5xl",
  large: "text-3xl md:text-6xl",
  md: "text-3xl md:text-4xl",
  sm: "text-lg md:text-xl",
};

const Heading: FC<HeadingProps> = (props) => {
  const {
    variant = "h2",
    children,
    textSize = "default",
    textCenter,
    textColor,
    disablePadding,
  } = props;

  const Tag = variant;

  return (
    <Tag
      className={cn(
        "font-bold",
        sizeClass[textSize],
        !disablePadding && "pb-4",
        textCenter && "text-center",
        textColor === "white" && "text-white",
        textColor === "navy" && "text-brand-navy",
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
