import { FC, ReactNode } from "react";

import { cn } from "@/app/_lib/utils";

export type ContentTextColor = "white" | "sky-blue";

export interface ContentProps {
  children: ReactNode;
  textColor?: ContentTextColor;
  textSize?: "lg" | "xl";
  textCenter?: boolean;
}

const Content: FC<ContentProps> = (props) => {
  const { children, textColor, textSize = "lg", textCenter } = props;
  return (
    <div
      className={cn(
        "[&>p]:leading-relaxed [&>p]:py-2 [&>ul]:list-disc [&>ul]:pl-10 [&>ul]:py-4 [&>ol]:list-decimal [&>ol]:pl-10 [&>ol]:py-4",
        textColor === "white" && "text-white",
        textColor === "sky-blue" && "text-brand-sky-blue",
        textSize === "lg" && "text-lg",
        textSize === "xl" && "text-xl",
        textCenter && "text-center",
      )}
    >
      {children}
    </div>
  );
};

export default Content;
