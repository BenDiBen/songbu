"use client";

import { Center, Heading, Icon, IconButton } from "@chakra-ui/react";
import { type ReactNode, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Step } from "./components/step";

export interface StepDefinition {
	id: number | string;
	label?: ReactNode;
	content?: ReactNode;
	isIncomplete?: boolean;
}

interface StepperProps {
	steps: StepDefinition[];
    lazy?: boolean;
}

export const Stepper = ({ steps, lazy = true }: StepperProps) => {
	const [activeStepIndex, setStepActiveStepIndex] = useState(0);
	const activeStep = steps[activeStepIndex];
	const { isIncomplete = false } = activeStep;

	const isFirst = activeStepIndex === 0;
	const isLast = activeStepIndex + 1 === steps.length;

	const handlePreviousClick = () => {
		setStepActiveStepIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNextClick = () => {
		setStepActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
	};

	return (
		<Center overflow="hidden" position="relative" minW="full" minH="full">
			<IconButton
				isDisabled={isFirst}
				display={isFirst ? "none" : "inline-flex"}
				aria-label="previous step"
				position="absolute"
				transformOrigin="center"
				transform="translateY(-50%)"
				top="50%"
				left={0}
				zIndex="overlay"
				onClick={handlePreviousClick}
				icon={<Icon as={LuChevronLeft} />}
				mx={8}
				isRound
				size="lg"
			/>
			<IconButton
				isDisabled={isIncomplete}
				display={isLast ? "none" : "inline-flex"}
				aria-label="next step"
				position="absolute"
				transformOrigin="center"
				transform="translateY(-50%)"
				top="50%"
				right={0}
				zIndex="overlay"
				onClick={handleNextClick}
				icon={<Icon as={LuChevronRight} />}
				mx={8}
				isRound
				size="lg"
			/>
			{steps.map((step, index) => (
				<Step
					key={step.id}
					activeStepIndex={activeStepIndex}
					stepIndex={index}
					label={<Heading>{`Step ${index + 1}`}</Heading>}
				>
					{step.content}
				</Step>
			))}
		</Center>
	);
};
