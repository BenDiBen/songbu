import { useSteps as useStepState } from "@chakra-ui/stepper";
import { is } from "ramda";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import type { ZodIssue, ZodType } from "zod";

export interface StepDefinitionProps<TState> {
	errors?: ZodIssue[];
	state: TState;
	onStateChange: Dispatch<SetStateAction<TState>>;
	onChange: <TProp extends keyof TState>(
		name: TProp,
	) => (valueOrUpdater: SetStateAction<TState[TProp]>) => void;
}

export interface StepDefinition<TState> {
	title: string;
	description: string;
	component: (props: StepDefinitionProps<TState>) => ReactNode;
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
			(valueOrUpdater: SetStateAction<TState[TProp]>) =>
				setState((prev) => ({
					...prev,
					[name]: is(Function, valueOrUpdater)
						? valueOrUpdater(prev[name])
						: valueOrUpdater,
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

	const goToStep = useCallback(
		(initialTargetIndex: number) => {
			let targetIndex = initialTargetIndex;

			if (targetIndex <= activeStepIndex) {
				setActiveStep(targetIndex);
			}

			for (let index = activeStepIndex; index < targetIndex; index++) {
				console.log(`Processing ${index}`);
				const hasErrors =
					steps[index].schema?.safeParse(state).success === false;

				if (hasErrors) {
					console.log(`${index} is incomplete`);
					targetIndex = index;
					const errors =
						steps[index].schema?.safeParse(state).error?.issues ?? [];
					setErrors(errors);
					return;
				}
			}

			setActiveStep(targetIndex);
		},
		[steps, setActiveStep, activeStepIndex, state],
	);

	useEffect(() => {
		setErrors((prevErrors) =>
			prevErrors.length > 0
				? steps[activeStepIndex].schema?.safeParse(state).error?.issues ?? []
				: [],
		);
	}, [steps, state, activeStepIndex]);

	const complete = steps.map(
		(step, index) =>
			index < activeStepIndex ||
			step.schema === undefined ||
			step.schema.safeParse(state).success,
	);

	return {
		activeStep,
		activeStepIndex,
		errors,
		goToNext: goToNextCallback,
		goToPrevious,
		goToStep: goToStep,
		hasNext: activeStepIndex < steps.length - 1,
		hasPrevious: activeStepIndex > 0,
		complete,
		onChange,
		setState,
		state,
	};
};
