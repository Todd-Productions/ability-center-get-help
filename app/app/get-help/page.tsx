import type { Metadata } from "next";

import GetHelpTemplate from "./_template/GetHelpTemplate";

export const metadata: Metadata = {
  title: "Get Help — Find Disability Services & Resources",
  description:
    "Answer a few quick questions and our service navigator will point you to the Ability Center programs, local resources, and support that best fit your needs.",
};

interface GetHelpPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function GetHelp({ searchParams }: GetHelpPageProps) {
  const { type } = await searchParams;

  return <GetHelpTemplate selectedStepOne={type} />;
}
