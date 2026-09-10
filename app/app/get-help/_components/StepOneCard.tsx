import React, { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

import Text from "@/app/_components/ui/Text";

export type IStepOneCard = {
  title: string;
  description: string;
  value: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

export interface StepOneCardProps extends IStepOneCard {
  onClick: (value: string) => void;
}

const StepOneCard: FC<StepOneCardProps> = (props) => {
  const { title, description, value, Icon, onClick } = props;
  return (
    <div
      onClick={() => onClick(value)}
      className="group flex h-full cursor-pointer flex-col rounded-sm bg-bg-gray outline transition-all hover:bg-white hover:outline-brand-sky-blue hover:shadow-lg"
    >
      <div className="flex flex-1 flex-col p-6 gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-navy/10 group-hover:bg-brand-navy transition-all">
          <Icon
            size={26}
            className={clsx(
              "text-brand-navy transition-all",
              "group-hover:text-white"
            )}
          />
        </div>
        <div className="flex-1">
          <Text className="text-black font-semibold">{title}</Text>
          <Text className="text-text-gray">{description}</Text>
        </div>
        <ArrowRight
          size={18}
          className="text-gray-400 transition-colors group-hover:text-brand-navy self-end"
        />
      </div>
    </div>
  );
};

export default StepOneCard;
