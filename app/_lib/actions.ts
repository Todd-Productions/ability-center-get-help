"use server";

import { getMailer } from "./mailer";
import { buildGetHelpRequestTemplate } from "./emailTemplate";
import type { GetHelpFormData } from "@/app/_sections/GetHelpStepper";

const profileTypeLabels: Record<string, string> = {
  parent: "Parent of child with a disability",
  individual: "An individual with a disability",
  provider: "Service Provider",
  educator: "Educator",
  community: "Community Member",
  other: "Other",
};

const needLabels: Record<number, string> = {
  1: "Housing & Accessibility",
  2: "Education & School Support",
  3: "Healthcare Services",
  4: "Employment & Training",
  5: "Social & Recreation",
  6: "Legal & Advocacy",
};

const contactMethodLabels: Record<string, string> = {
  email: "Email",
  phone: "Phone Call",
};

const countyLabels: Record<string, string> = {
  lucas: "Lucas County",
  wood: "Wood County",
};

const bestTimeLabels: Record<string, string> = {
  anytime: "Anytime",
  morning: "Morning (8am - 12pm)",
  afternoon: "Afternoon (12pm - 5pm)",
  evening: "Evening (5pm - 8pm)",
};

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const verifyRecaptcha = async (token: string) => {
  const secret = process.env.NEXT_RECAPTCHA_SECRET;
  if (!secret) return false;

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    },
  );

  const result = (await response.json()) as { success: boolean };
  return result.success === true;
};

export const submitGetHelpRequest = async (
  data: GetHelpFormData,
  recaptchaToken: string,
) => {
  if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
    return {
      success: false as const,
      error: "reCAPTCHA verification failed. Please try again.",
    };
  }

  const stepThree = data.stepThree;

  if (!stepThree?.fullName || !stepThree?.email || !stepThree?.phoneNumber) {
    return { success: false as const, error: "Missing required fields." };
  }

  if (!emailPattern.test(stepThree.email)) {
    return { success: false as const, error: "Invalid email address." };
  }

  const emailTo = process.env.EMAIL_TO;
  if (!emailTo) {
    return { success: false as const, error: "Email is not configured." };
  }

  const template = buildGetHelpRequestTemplate({
    fullName: stepThree.fullName,
    email: stepThree.email,
    phoneNumber: stepThree.phoneNumber,
    county: stepThree.county
      ? (countyLabels[stepThree.county] ?? stepThree.county)
      : "Not provided",
    preferredContactMethod:
      contactMethodLabels[stepThree.preferredContactMethod] ??
      stepThree.preferredContactMethod,
    bestTimeToContact:
      bestTimeLabels[stepThree.bestTimeToContact] ??
      stepThree.bestTimeToContact,
    profileType: data.stepOne
      ? (profileTypeLabels[data.stepOne] ?? data.stepOne)
      : "Not selected",
    needs: (data.stepTwo ?? []).map(
      (value) => needLabels[value] ?? `Option ${value}`,
    ),
    additionalInfo: stepThree.additionalInfo,
  });

  try {
    await getMailer().sendMail({
      from: process.env.SMTP_USER,
      to: emailTo,
      replyTo: stepThree.email,
      subject: template.subject,
      html: template.html,
    });

    return { success: true as const };
  } catch {
    return {
      success: false as const,
      error: "Something went wrong sending your request. Please try again.",
    };
  }
};
