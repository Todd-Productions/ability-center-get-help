import { ReactNode } from "react";

import { cn } from "@/app/_lib/utils";

interface WrapperProps {
  children: ReactNode;
  /** optional max content width in px; unconstrained when omitted */
  maxWidth?: number;
  className?: string;
}

const Wrapper = ({ children, maxWidth, className }: WrapperProps) => {
  return (
    <div
      className={cn("mx-auto w-full", className)}
      style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
    >
      {children}
    </div>
  );
};

export default Wrapper;
