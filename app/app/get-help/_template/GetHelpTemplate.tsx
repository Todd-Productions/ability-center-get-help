import GetHelpStepper from "../_sections/GetHelpStepper";

export interface GetHelpTemplateProps {
  // Users can reach this page from the home page with a pre-selected step one
  selectedStepOne?: string;
}

const GetHelpTemplate = ({ selectedStepOne }: GetHelpTemplateProps) => {
  // Header and Footer are provided globally by the root layout — this template
  // only renders the page body.
  return <GetHelpStepper selectedStepOne={selectedStepOne} />;
};

export default GetHelpTemplate;
