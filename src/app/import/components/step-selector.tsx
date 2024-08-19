import { ImportStep } from "./import-step";
import type { ImportWizardProps } from "./types";

export const StepSelector = (props: ImportWizardProps) => {
	switch (props.state.currentStepType) {
		case "import":
			return <ImportStep {...props} />;
		case "enrich":
			return "Nope";
		case "upload":
			return "Nope";
	}
};
