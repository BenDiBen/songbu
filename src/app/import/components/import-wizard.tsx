"use client";

import { Box, Divider, VStack } from "@chakra-ui/react";
import {
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
} from "@chakra-ui/stepper";
import { useImportWizardReducer } from "./reducer";
import { StepSelector } from "./step-selector";

export const ImportWizard = () => {
	const [state, dispatch] = useImportWizardReducer();
	const activeStep =
		state.steps.find((step) => step.type === state.currentStepType) ??
		state.steps[0];
	const index = state.steps.indexOf(activeStep);

	return (
		<VStack alignItems="stretch">
			<Stepper index={index}>
				{state.steps.map((step) => (
					<Step key={step.label}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>
						<Box flexShrink="0">
							<StepTitle>{step.label}</StepTitle>
							<StepDescription>{step.description}</StepDescription>
						</Box>
						<StepSeparator />
					</Step>
				))}
			</Stepper>
			<Divider />
			<StepSelector state={state} dispatch={dispatch} />
		</VStack>
	);
};
