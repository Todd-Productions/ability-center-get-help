import { ReactNode } from "react";

import { cn } from "@/app/_lib/utils";
import Wrapper from "./Wrapper";

export interface ISectionStyles {
  wrapperMaxWidth?: number;
}

interface SectionStyleProps extends ISectionStyles {
  children: ReactNode;
  id?: string;
  className?: string;
  paddingTop?: boolean;
  paddingBottom?: boolean;
}

export type SectionProps = SectionStyleProps;

const Section: React.FC<SectionProps> = (props: SectionProps) => {
  const {
    children,
    wrapperMaxWidth,
    id,
    className,
    paddingTop = true,
    paddingBottom = true,
  } = props;

  return (
    <section
      id={id}
      className={cn(
        "relative px-4",
        paddingTop && "pt-14 md:pt-20",
        paddingBottom && "pb-14 md:pb-20",
        className,
      )}
    >
      <Wrapper maxWidth={wrapperMaxWidth}>{children}</Wrapper>
    </section>
  );
};

export default Section;
