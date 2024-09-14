import { useSteps as useStepState } from "@chakra-ui/stepper";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import type { ZodIssue, ZodType } from "zod";

export interface StepDefinitionProps<TState> {
	errors?: ZodIssue[];
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
	const [errors, setErrors] = useState<ZodIssue[]>([]);
	const [state, setState] = useState(initialState);
	const {
		activeStep: activeStepIndex,
		setActiveStep,
		goToNext,
		goToPrevious,
	} = useStepState({
		index: 0,
		count: steps.length,
	});

	const activeStep = steps[activeStepIndex];
	const onChange = useCallback(
		<TProp extends keyof TState>(name: TProp) =>
			(value: TState[TProp]) =>
				setState((prev) => ({
					...prev,
					[name]: value,
				})),
		[],
	);

	const goToNextCallback = useCallback(() => {
		const errors =
			steps[activeStepIndex].schema?.safeParse(state).error?.issues ?? [];
		if (errors.length > 0) {
			setErrors(errors);
			return;
		}

		setErrors([]);
		goToNext();
	}, [goToNext, activeStepIndex, steps, state]);

	useEffect(() => {
		setErrors((prevErrors) =>
			prevErrors.length > 0
				? steps[activeStepIndex].schema?.safeParse(state).error?.issues ?? []
				: [],
		);
	}, [steps, state, activeStepIndex]);

	return {
		activeStep,
		activeStepIndex,
		errors,
		goToNext: goToNextCallback,
		goToPrevious,
		goToStep: setActiveStep,
		hasNext: activeStepIndex < steps.length - 1,
		hasPrevious: activeStepIndex > 0,
		isComplete: !activeStep.isComplete || activeStep.isComplete(state),
		onChange,
		setState,
		state,
	};
};
