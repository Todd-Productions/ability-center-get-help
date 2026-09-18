import { ReactNode } from "react";

import { cn } from "@/app/_lib/utils";

interface WrapperProps {
  children: ReactNode;
  width?: number;
  maxWidth?: number;
  className?: string;
}

const Wrapper = ({ children, maxWidth, width, className }: WrapperProps) => {
  return (
    <div
      className={cn("mx-auto w-full", className)}
      style={{
        width: `${width ? width : "95"}%`,
        maxWidth: `${maxWidth ?? 1320}px`,
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
