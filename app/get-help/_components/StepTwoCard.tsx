import React, { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import clsx from "clsx";

import Text from "@/app/_components/ui/Text";
import { Button } from "@/app/_components/ui/button";

export interface StepTwoCardProps {
  title: string;
  description: string;
  value: string | number;
  selected: boolean;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
}

const StepTwoCard: FC<StepTwoCardProps> = (props) => {
  const { title, description, selected, Icon, onClick } = props;
  return (
    <div
      className={clsx("py-6 px-4 border rounded-sm transition-all bg-white h-full", {
        "border-brand-sky-blue bg-bg-gray": selected,
        "hover:border-gray-400": !selected,
      })}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div className="flex items-start gap-4 flex-1">
          <div className="mt-1 shrink-0">
            <Icon size={22} className="text-brand-navy" />
          </div>
          <div>
            <Text className="font-semibold text-black">{title}</Text>
            <Text className="text-text-gray text-sm">{description}</Text>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={onClick}
          variant={selected ? "blue" : "outline"}
          // beat the `font-bold` in buttonVariants' base (cn has no tw-merge)
          className="!font-medium"
        >
          {selected ? "Selected" : "Select"}
        </Button>
      </div>
    </div>
  );
};

export default StepTwoCard;
