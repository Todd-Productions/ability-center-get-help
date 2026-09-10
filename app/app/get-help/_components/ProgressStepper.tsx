import React, { FC } from "react";

export interface ProgressStepperProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressStepper: FC<ProgressStepperProps> = ({
  currentStep,
  totalSteps = 3,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-[1000px] !mx-auto !mb-8">
      {/* Step Text */}
      <div className="text-center">
        <span className="text-xs font-medium text-text-gray tracking-wide">
          STEP {currentStep} OF {totalSteps}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
        <div
          className="absolute top-0 left-0 h-full bg-brand-gold transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressStepper;
