import { FC } from "react";
import { useFormContext } from "react-hook-form";

import {
  Briefcase,
  GraduationCap,
  HeartHandshake,
  House,
  Scale,
  Users,
} from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import SectionIntro from "@/app/_components/ui/SectionIntro";
import StepTwoCard from "../_components/StepTwoCard";
import { GetHelpFormData } from "./GetHelpStepper";

export interface StepTwoSectionProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

const dummyData = [
  {
    title: "Housing & Accessibility",
    description: "Finding accessible housing and modifications.",
    value: 1,
    Icon: House,
  },
  {
    title: "Education & School Support",
    description: "IEP assistance and educational resources.",
    value: 2,
    Icon: GraduationCap,
  },
  {
    title: "Healthcare Services",
    description: "Medical care and therapy services.",
    value: 3,
    Icon: HeartHandshake,
  },
  {
    title: "Employment & Training",
    description: "Job placement and vocational training.",
    value: 4,
    Icon: Briefcase,
  },
  {
    title: "Social & Recreation",
    description: "Community activities and social programs.",
    value: 5,
    Icon: Users,
  },
  {
    title: "Legal & Advocacy",
    description: "Rights protection and legal assistance.",
    value: 6,
    Icon: Scale,
  },
];

const StepTwoSection: FC<StepTwoSectionProps> = ({
  onNextStep,
  onBackStep,
}) => {
  const { watch, setValue } = useFormContext<GetHelpFormData>();
  const selected = watch("stepTwo") || [];

  const handleCardClick = (value: number) => {
    if (selected.includes(value)) {
      setValue(
        "stepTwo",
        selected.filter((v) => v !== value),
      );
    } else {
      setValue("stepTwo", [...selected, value]);
    }
  };

  return (
    <div>
      <div className="!mx-auto max-w-[800px] mb-12">
        <SectionIntro
          heading="What can we help you with today?"
          description="Select one or more areas where you need support. This will help us find the right services for you."
        />
      </div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyData.map((card) => (
          <li key={card.title}>
            <StepTwoCard
              title={card.title}
              description={card.description}
              value={card.value}
              selected={selected.includes(card.value)}
              Icon={card.Icon}
              onClick={() => handleCardClick(card.value)}
            />
          </li>
        ))}
      </ul>

      <div className="!mt-12 flex gap-4 justify-end">
        <Button onClick={onBackStep} variant="secondary">
          Back
        </Button>
        <Button
          onClick={onNextStep}
          disabled={selected.length === 0}
          variant="blue"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepTwoSection;
