import { type ReactNode, useCallback, useState } from "react";
import { useSteps as useStepState } from "@chakra-ui/stepper";
import type { ZodType } from "zod";

export interface StepDefinitionProps<TState> {
	state: TState;
	onStateChange: (state: Partial<TState>) => void;
	onChange: <TProp extends keyof TState>(
		name: TProp,
	) => (value: TState[TProp]) => void;
}

export interface StepDefinition<TState> {
	title: string;
	description: string;
	component: (props: StepDefinitionProps<TState>) => ReactNode;
	isComplete?: (props: TState) => boolean;
	schema?: ZodType<TState>;
}

export const useSteps = <TState>(
	steps: StepDefinition<TState>[],
	initialState: TState,
) => {
	const [state, setState] = useState(initialState);
	const { activeStep, setActiveStep, goToNext, goToPrevious } = useStepState({
		index: 0,
		count: steps.length,
	});

	const { title, description, component, isComplete } = steps[activeStep];
	const onChange = useCallback(
		<TProp extends keyof TState>(name: TProp) =>
			(value: TState[TProp]) =>
				setState((prev) => ({
					...prev,
					[name]: value,
				})),
		[],
	);

	return {
		activeStep,
		component,
		description,
		goToNext,
		goToPrevious,
		goToStep: setActiveStep,
		hasNext: activeStep < steps.length - 1,
		hasPrevious: activeStep > 0,
		isComplete: !isComplete || isComplete(state),
		onChange,
		state,
		setState,
		title,
	};
};
