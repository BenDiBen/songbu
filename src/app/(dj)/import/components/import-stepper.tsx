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
	useBoolean,
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
		isComplete: ({ file }) => !!file,
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
		isComplete: ({ mapping }) => !!mapping,
		schema: z.object({
			mapping: z.object({
				artist: z.string(),
				title: z.string(),
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
	} = useSteps(steps, {});

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
						<StepIndicator onClick={() => goToStep(index)}>
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
