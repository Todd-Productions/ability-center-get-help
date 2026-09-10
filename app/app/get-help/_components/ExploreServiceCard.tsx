import React, { FC } from "react";
import clsx from "clsx";

import Text from "@/app/_components/ui/Text";
import { Checkbox } from "@/components/ui/checkbox";

export interface ExploreServiceCardProps {
  title: string;
  description: string;
  value: string;
  selected: boolean;
  onToggle: (value: string) => void;
}

const ExploreServiceCard: FC<ExploreServiceCardProps> = ({
  title,
  description,
  value,
  selected,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(value)}
      className={clsx("p-6 border rounded-sm cursor-pointer transition-all", {
        "border-brand-sky-blue bg-white": selected,
        "border-gray-200 hover:border-gray-400": !selected,
      })}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onToggle(value)}
          className="mt-1"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex-1">
          <Text className="font-medium text-black mb-1">{title}</Text>
          <Text className="text-text-gray text-sm">{description}</Text>
        </div>
      </div>
    </div>
  );
};

export default ExploreServiceCard;
