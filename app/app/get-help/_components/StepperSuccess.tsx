import React from "react";

import { CircleCheck, Clock } from "lucide-react";

import Card from "@/app/_components/ui/Card";
import Text from "@/app/_components/ui/Text";
import ButtonLink from "@/app/_components/ui/ButtonLink";

const StepperSuccess = () => {
  return (
    <Card className="max-w-[600px] mx-auto">
      <div className="text-center">
        <CircleCheck className="h-10 w-10 mx-auto text-green-500" />
        <Text className="font-semibold text-3xl pt-2 pb-4">
          Thank you for reaching out
        </Text>
        <Text>
          Your request has been successfully submitted. We've sent a
          confirmation to the email address you provided.
        </Text>

        <div className="bg-bg-gray text-left outline outline-gray-200 p-6 rounded-sm my-8">
          <Text>What happens next?</Text>
          <div className="flex items-start gap-3 mt-4">
            <Clock className="h-6 w-6" />
            <div>
              <Text>
                A member of our Navigator team will carefully review your
                information and get in touch with you within 1-2 business days.
              </Text>
              <small>
                Our business hours are Monday - Friday, 9:00 AM - 5:00 PM.
              </small>
            </div>
          </div>
        </div>
        <ButtonLink href="/" showIcon={false} buttonColor="gold">
          Return to Homepage
        </ButtonLink>
      </div>
    </Card>
  );
};

export default StepperSuccess;
