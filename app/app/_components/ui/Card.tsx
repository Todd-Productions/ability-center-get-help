import { ReactNode } from "react";

import { cn } from "@/app/_lib/utils";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("bg-white p-10 outline outline-gray-200", className)}>
      {children}
    </div>
  );
};

export default Card;
