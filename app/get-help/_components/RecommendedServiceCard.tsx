import React, { FC } from "react";
import clsx from "clsx";

import Text from "@/app/_components/ui/Text";
import { Button } from "@/app/_components/ui/button";

export interface RecommendedServiceCardProps {
  title: string;
  description: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

const RecommendedServiceCard: FC<RecommendedServiceCardProps> = ({
  title,
  description,
  value,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={clsx("p-6 border rounded-sm transition-all bg-white", {
        "border-brand-sky-blue bg-bg-gray": selected,
        " hover:border-gray-400": !selected,
      })}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <Text className="font-semibold text-black mb-2">{title}</Text>
          <Text className="text-text-gray text-sm">{description}</Text>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => onSelect(value)}
          variant={selected ? "blue" : "outline"}
        >
          {selected ? "Selected" : "Select"}
        </Button>
      </div>
    </div>
  );
};

export default RecommendedServiceCard;
