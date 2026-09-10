import { ReactNode } from "react";

import { cn } from "@/app/_lib/utils";
import Heading, { HeadingTextColor } from "./Heading";
import Content, { ContentTextColor } from "./Content";

export interface SectionIntroProps {
  subtitle?: string;
  heading: string;
  headingColor?: HeadingTextColor;
  headingSize?: "default" | "large" | "md" | "sm";
  description?: ReactNode;
  descriptionColor?: ContentTextColor;
  paddingBottomSmall?: boolean;
}

const SectionIntro = (props: SectionIntroProps) => {
  const {
    subtitle,
    heading,
    description,
    headingColor,
    headingSize,
    descriptionColor,
    paddingBottomSmall = false,
  } = props;
  return (
    <div
      className={cn(
        "text-center max-w-[850px] !mx-auto pb-16",
        paddingBottomSmall && "!pb-8",
      )}
    >
      {subtitle && (
        <span className="text-brand-gold uppercase text-lg font-bold">
          {subtitle}
        </span>
      )}
      <Heading textCenter textColor={headingColor} textSize={headingSize}>
        {heading}
      </Heading>
      {description && (
        <Content textCenter textColor={descriptionColor}>
          {description}
        </Content>
      )}
    </div>
  );
};

export default SectionIntro;
