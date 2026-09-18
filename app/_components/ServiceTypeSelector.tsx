import { FC } from "react";
import {
  Baby,
  Accessibility,
  Briefcase,
  GraduationCap,
  Users,
  HelpCircle,
} from "lucide-react";

import { externalUrl } from "@/app/_lib/externalUrl";
import StepOneCard, { IStepOneCard } from "./StepOneCard";
import Heading from "@/app/_components/ui/Heading";
import Content from "@/app/_components/ui/Content";
import TextLink from "@/app/_components/ui/TextLink";

export type { IStepOneCard as ServiceTypeOption };

export const defaultOptions: IStepOneCard[] = [
  {
    title: "Parent of child with a disability",
    description: "Guidance and resources for parents.",
    value: "parent",
    Icon: Baby,
  },
  {
    title: "Individual with a disability",
    description: "Resources for self-advocacy and support.",
    value: "individual",
    Icon: Accessibility,
  },
  {
    title: "Service Provider",
    description: "Information for professionals and organizations.",
    value: "provider",
    Icon: Briefcase,
  },
  {
    title: "Educator",
    description: "Resources for teachers and school staff.",
    value: "educator",
    Icon: GraduationCap,
  },
  {
    title: "Community Member",
    description: "Ways to support and get involved.",
    value: "community",
    Icon: Users,
  },
  {
    title: "Other",
    description: "Connect with us to find the right support.",
    value: "other",
    Icon: HelpCircle,
  },
];

export interface ServiceTypeSelectorProps {
  options: IStepOneCard[];
  onSelect: (value: string) => void;
}

const ServiceTypeSelector: FC<ServiceTypeSelectorProps> = ({
  options,
  onSelect,
}) => (
  <>
    <div className="text-center max-w-[850px] !mx-auto pb-16">
      <Heading textCenter>Let&apos;s find the right support for you.</Heading>
      <Content>
        Begin by telling us who you are so we can guide you to the right
        resources. If you prefer, you can connect directly with one of our{" "}
        <TextLink href={externalUrl("/navigators/")}>Navigators</TextLink> now.
      </Content>
    </div>
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((card) => (
        <li key={card.value}>
          <StepOneCard {...card} onClick={onSelect} />
        </li>
      ))}
    </ul>
  </>
);

export default ServiceTypeSelector;
