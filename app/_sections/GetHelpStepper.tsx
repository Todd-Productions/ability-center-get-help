"use client";

import { useMachine } from "@xstate/react";
import { LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { setup } from "xstate";

import Section from "@/app/_components/ui/Section";
import ProgressStepper from "../_components/ProgressStepper";
import StepFourSection from "./StepFourSection";
import StepOneSection from "./StepOneSection";
import StepThreeSection from "./StepThreeSection";
import StepTwoSection from "./StepTwoSection";

import {
  Accessibility,
  Baby,
  Briefcase,
  GraduationCap,
  HelpCircle,
  Users,
} from "lucide-react";

export type IStepOneCard = {
  title: string;
  description: string;
  value: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const defaultOptions: IStepOneCard[] = [
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

export interface GetHelpStepperProps {
  selectedStepOne?: string;
}

// Define the form data structure
export interface GetHelpFormData {
  stepOne?: string;
  stepTwo?: number[];
  stepThree?: {
    fullName: string;
    email: string;
    phoneNumber: string;
    county?: string;
    preferredContactMethod: "email" | "phone";
    bestTimeToContact: string;
    additionalInfo?: string;
  };
}

interface StepperContext {
  selectedStepOne?: string;
}

interface StepperInput {
  selectedStepOne?: string;
}

// Define the state machine for the 4-step form
// Starts in "init" and immediately (synchronously, before first paint) resolves
// to step2 when the user arrived with a valid pre-selected step-one value
// (e.g. from the home page's `?type=` link), otherwise to step1.
const stepperMachine = setup({
  types: {
    context: {} as StepperContext,
    input: {} as StepperInput,
  },
}).createMachine({
  id: "getHelpStepper",
  initial: "init",
  context: ({ input }) => ({
    selectedStepOne: input.selectedStepOne,
  }),
  states: {
    init: {
      always: [
        {
          guard: ({ context }) => Boolean(context.selectedStepOne),
          target: "step2",
        },
        { target: "step1" },
      ],
    },
    step1: {
      on: {
        NEXT: "step2",
      },
    },
    step2: {
      on: {
        NEXT: "step3",
        BACK: "step1",
      },
    },
    step3: {
      on: {
        NEXT: "step4",
        BACK: "step2",
      },
    },
    step4: {
      on: {
        BACK: "step3",
      },
    },
  },
});

const GetHelpStepper: FC<GetHelpStepperProps> = (props) => {
  const { selectedStepOne } = props;

  // Only trust a `selectedStepOne` (e.g. from the home page's `?type=`
  // query param) that matches one of our actual step-one options.
  const isValidStepOne = defaultOptions.some(
    (option) => option.value === selectedStepOne,
  );
  const initialStepOne = isValidStepOne ? selectedStepOne : undefined;

  const [state, send] = useMachine(stepperMachine, {
    input: { selectedStepOne: initialStepOne },
  });

  // Initialize react-hook-form
  const methods = useForm<GetHelpFormData>({
    defaultValues: {
      stepOne: initialStepOne,
      stepTwo: [],
      stepThree: {
        fullName: "",
        email: "",
        phoneNumber: "",
        county: "",
        preferredContactMethod: "email",
        bestTimeToContact: "anytime",
        additionalInfo: "",
      },
    },
  });

  const currentStep = state.value as string;

  const handleNextStep = () => {
    send({ type: "NEXT" });
  };

  const handleBackStep = () => {
    send({ type: "BACK" });
  };

  const getStepNumber = (step: string): number => {
    switch (step) {
      case "step1":
        return 1;
      case "step2":
        return 2;
      case "step3":
        return 3;
      default:
        return 4;
    }
  };

  const showStepper = currentStep !== "step4";

  return (
    <FormProvider {...methods}>
      <Section
        className="bg-bg-gray"
        wrapperMaxWidth={currentStep === "step3" ? undefined : 1000}
      >
        {showStepper && (
          <ProgressStepper currentStep={getStepNumber(currentStep)} />
        )}
        {currentStep === "step1" && (
          <StepOneSection onNextStep={handleNextStep} />
        )}
        {currentStep === "step2" && (
          <StepTwoSection
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
          />
        )}
        {currentStep === "step3" && (
          <StepThreeSection
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
          />
        )}
        {currentStep === "step4" && <StepFourSection />}
      </Section>
    </FormProvider>
  );
};

export default GetHelpStepper;
