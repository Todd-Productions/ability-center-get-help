import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { User, Users2, ArrowRight } from "lucide-react";

import { GetHelpFormData } from "./GetHelpStepper";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/app/_components/ui/button";
import Heading from "@/app/_components/ui/Heading";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import Text from "@/app/_components/ui/Text";

export interface StepThreeSectionProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

const StepThreeSection: FC<StepThreeSectionProps> = (props) => {
  const { onNextStep, onBackStep } = props;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<GetHelpFormData>();

  const stepOneValue = watch("stepOne");
  const stepTwoValues = watch("stepTwo") || [];

  // Map step one values to labels
  const stepOneLabels: Record<string, string> = {
    parent: "Parent of child with a disability",
    individual: "An individual with a disability",
    provider: "Service Provider",
    educator: "Educator",
    community: "Community Member",
    other: "Other",
  };

  // Map step two values to labels
  const stepTwoLabels: Record<number, string> = {
    1: "Housing & Accessibility",
    2: "Education & School Support",
    3: "Healthcare Services",
    4: "Employment & Training",
    5: "Social & Recreation",
    6: "Legal & Advocacy",
  };

  const onSubmit = () => {
    // Form data is already saved in the form context
    onNextStep();
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-14">
        {/* Left Side - Journey Summary */}
        <div>
          <div>
            <div className="!mb-4 flex items-center gap-2 text-text-gray">
              <Users2 className="w-5 h-5" />

              <Text>Connect with a Navigator</Text>
            </div>
            <Heading textSize="md">Just a few more details...</Heading>
            <Text>
              Let us know how to reach you. A Navigator will be in touch soon to
              listen and help you find the support you need. This is a free,
              confidential conversation.
            </Text>
          </div>
          <div className="bg-bg-gray p-8 rounded-sm h-fit bg-white !mt-4 outline outline-gray-200">
            <div className="!space-y-6">
              {/* Your Profile */}
              <div>
                <Text className="!mb-4">Your Journey So Far</Text>
                <div className="flex items-center gap-2 !mb-2">
                  <User className="w-4 h-4 text-text-gray" />
                  <Text className="text-sm font-semibold uppercase text-text-gray">
                    Your Profile
                  </Text>
                </div>
                <Text className="text-black">
                  {stepOneValue
                    ? stepOneLabels[stepOneValue] || stepOneValue
                    : "Not selected"}
                </Text>
              </div>

              {/* Needs - Shows Step 2 selections */}
              {stepTwoValues.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 !mb-2">
                    <Users2 className="w-4 h-4 text-text-gray" />
                    <Text className="text-sm font-semibold uppercase text-text-gray">
                      Needs
                    </Text>
                  </div>
                  <div>
                    {stepTwoValues.map((value) => (
                      <Text key={value} className="text-black">
                        {stepTwoLabels[value] || `Option ${value}`}
                      </Text>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onBackStep}
              className="!mt-8 text-sm text-text-gray hover:text-black underline cursor-pointer"
            >
              Need to change something? Go back
            </button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-8 outline outline-gray-200 rounded-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(onSubmit)();
            }}
            className="w-full space-y-6"
          >
            {/* Full Name */}
            <div>
              <Input
                label="Full Name"
                id="fullName"
                placeholder="e.g., Jane Doe"
                required
                {...register("stepThree.fullName", {
                  required: "Full name is required",
                })}
              />
              {errors.stepThree?.fullName && (
                <span className="text-red-600 text-sm">
                  {errors.stepThree.fullName.message}
                </span>
              )}
            </div>

            {/* Email and Phone - Two columns */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  {...register("stepThree.email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.stepThree?.email && (
                  <span className="text-red-600 text-sm">
                    {errors.stepThree.email.message}
                  </span>
                )}
              </div>

              <div>
                <Input
                  label="Phone Number"
                  type="tel"
                  id="phoneNumber"
                  placeholder="(555) 123-4567"
                  required
                  {...register("stepThree.phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.stepThree?.phoneNumber && (
                  <span className="text-red-600 text-sm">
                    {errors.stepThree.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>

            {/* County */}
            <div>
              <Label htmlFor="county" className="text-sm font-medium mb-3 block">
                County
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("stepThree.county", value, { shouldValidate: true })
                }
              >
                <SelectTrigger id="county" className="w-full">
                  <SelectValue placeholder="Select a county" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lucas">Lucas County</SelectItem>
                  <SelectItem value="wood">Wood County</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("stepThree.county", {
                  required: "County is required",
                })}
              />
              {errors.stepThree?.county && (
                <span className="text-red-600 text-sm">
                  {errors.stepThree.county.message}
                </span>
              )}
            </div>

            {/* Preferred Contact Method - Radio Group */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Preferred contact method
              </Label>
              <RadioGroup
                defaultValue="email"
                onValueChange={(value) =>
                  setValue(
                    "stepThree.preferredContactMethod",
                    value as "email" | "phone",
                  )
                }
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-sm hover:bg-bg-gray cursor-pointer">
                  <Label
                    htmlFor="email-method"
                    className="flex items-center space-x-2 hover:bg-bg-gray cursor-pointer pl-4 py-4 w-full"
                  >
                    <RadioGroupItem
                      value="email"
                      id="email-method"
                      className="cursor-pointer"
                    />
                    <span>Email</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-sm hover:bg-bg-gray cursor-pointer">
                  <Label
                    htmlFor="phone-method"
                    className="flex items-center space-x-2 hover:bg-bg-gray cursor-pointer pl-4 py-4 w-full"
                  >
                    <RadioGroupItem
                      value="phone"
                      id="phone-method"
                      className="cursor-pointer"
                    />
                    <span>Phone Call</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Best Time to Contact - Dropdown */}
            <div>
              <Label
                htmlFor="bestTime"
                className="text-sm font-medium mb-3 block"
              >
                Best time to contact
              </Label>
              <Select
                defaultValue="anytime"
                onValueChange={(value) =>
                  setValue("stepThree.bestTimeToContact", value)
                }
              >
                <SelectTrigger id="bestTime" className="w-full">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">Anytime</SelectItem>
                  <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12pm - 5pm)
                  </SelectItem>
                  <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Info - Optional Textarea */}
            <div>
              <Input
                label="Anything else you'd like to share? (Optional)"
                placeholder="Tell us a bit about your situation or specific questions you have."
                type="textarea"
                id="additionalInfo"
                {...register("stepThree.additionalInfo")}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 !mb-4">
              <Button type="submit" className="w-full group">
                Send My Request
                <ArrowRight className="!ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-start gap-2 pt-2">
              <div className="w-4 h-4 !mt-0.5 flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-text-gray"
                >
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zm0-6H7V4h2v2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <Text className="text-xs text-text-gray">
                Your privacy is important to us. The information you provide is
                confidential and will{" "}
                <span className="font-semibold">only</span> be used to connect
                you with the right support.
              </Text>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepThreeSection;
