import GetHelpTemplate from "./_template/GetHelpTemplate";

interface GetHelpPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function GetHelp({ searchParams }: GetHelpPageProps) {
  const { type } = await searchParams;

  return <GetHelpTemplate selectedStepOne={type} />;
}
