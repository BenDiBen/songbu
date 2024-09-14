"use client";

import { type StepDefinition, useSteps } from "@/hooks/use-steps";
import {
	Box,
	Button,
	HStack,
	Stack,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { SelectColumnsStep } from "./select-columns-step";
import { SelectFileStep } from "./select-file-step";
import type { CsvImportStepperState } from "./types";

const steps: StepDefinition<CsvImportStepperState>[] = [
	{
		title: "Source",
		description: "Select your songs",
		component: SelectFileStep,
		schema: z.object({
			file: z.instanceof(File, {
				message: "Please select a file",
			}),
		}),
	},
	{
		title: "Mapping",
		description: "Map your song data",
		component: SelectColumnsStep,
		schema: z.object({
			mapping: z.object({
				artist: z.string().min(1, "Required"),
				title: z.string().min(1, "Required"),
			}),
		}),
	},
	{
		title: "Upload",
		description: "Create your song book!",
		component: () => "Beep boop",
		schema: z.object({
			name: z.string(),
		}),
	},
];

export const ImportStepper = () => {
	const {
		activeStep: { component: StepComponent, schema, title },
		activeStepIndex,
		errors,
		goToNext,
		goToPrevious,
		goToStep,
		hasNext,
		hasPrevious,
		onChange,
		state,
		setState,
		complete,
	} = useSteps(steps, { file: undefined, mapping: undefined, name: undefined });

	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			spacing={{ base: 10, sm: 20 }}
			flexGrow={1}
			my={{ base: 8, sm: 10, md: 20, lg: 40 }}
		>
			<Stepper index={activeStepIndex} width="full" maxWidth="4xl">
				{steps.map((step, index) => (
					<Step key={step.title}>
						<StepIndicator
							cursor={
								complete.slice(0, index).every((x) => x) ||
								index === activeStepIndex
									? "pointer"
									: "not-allowed"
							}
							onClick={() => goToStep(index)}
						>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>

						<Box flexShrink="0" display={{ base: "none", sm: "block" }}>
							<StepTitle>{step.title}</StepTitle>
							<Box display={{ base: "none", md: "block" }}>
								<StepDescription>{step.description}</StepDescription>
							</Box>
						</Box>

						<StepSeparator />
					</Step>
				))}
			</Stepper>
			<Stack flexGrow={1}>
				<StepComponent
					errors={errors}
					state={state}
					onStateChange={setState}
					onChange={onChange}
				/>
			</Stack>
			<Text>{JSON.stringify(state)}</Text>
			<HStack>
				{hasPrevious && (
					<Button width={32} variant="secondary" onClick={goToPrevious}>
						Back
					</Button>
				)}
				{hasNext && (
					<Button width={32} onClick={goToNext}>
						Next
					</Button>
				)}
			</HStack>
		</Stack>
	);
};
