import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import Link from "next/link";

import { Phone } from "lucide-react";

import ServiceTypeSelector, {
  defaultOptions,
} from "@/app/get-help/_components/ServiceTypeSelector";
import Text from "@/app/_components/ui/Text";
import ButtonLink from "@/app/_components/ui/ButtonLink";
import { GetHelpFormData } from "./GetHelpStepper";

export interface StepOneSectionProps {
  onNextStep: () => void;
}

const StepOneSection: FC<StepOneSectionProps> = ({ onNextStep }) => {
  const { setValue } = useFormContext<GetHelpFormData>();

  const handleSelect = (value: string) => {
    setValue("stepOne", value);
    onNextStep();
  };

  return (
    <div>
      <ServiceTypeSelector options={defaultOptions} onSelect={handleSelect} />
      <Text className="text-center pt-8 pb-12">
        Are you a professional or partner?{" "}
        <Link href="#">Get resources here</Link>.
      </Text>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ButtonLink
          href="#"
          buttonColor="blue"
          textColor="white"
          showIcon={false}
        >
          Connect with a Navigator Now
        </ButtonLink>
        <ButtonLink
          href="#"
          buttonColor="orange"
          textColor="white"
          icon={Phone}
        >
          Talk to a Navigator
        </ButtonLink>
      </div>
    </div>
  );
};

export default StepOneSection;
