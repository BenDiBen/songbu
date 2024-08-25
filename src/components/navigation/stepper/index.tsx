"use client";

import { Center, Heading, Icon, IconButton } from "@chakra-ui/react";
import { range } from "ramda";
import { type ReactNode, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Step } from "./components/step";

const steps: StepDefinition[] = range(0, 12).map((index) => ({
	id: index + 1,
	label: <Heading>{`Step ${index + 1}`}</Heading>,
	content: <Heading height="2xl">Hello! Hello! Hello!</Heading>,
}));

interface StepDefinition {
	id: number | string;
	label?: ReactNode;
	content?: ReactNode;
}

export const Stepper = () => {
	const [activeStepIndex, setStepActiveStepIndex] = useState(0);

	return (
		<Center overflow="hidden" position="relative" minW="full" minH="full">
			<IconButton
				aria-label="next step"
				position="absolute"
				transformOrigin="center"
				top="50%"
				left={0}
				zIndex="overlay"
				onClick={() => setStepActiveStepIndex((prev) => Math.max(prev - 1, 0))}
				icon={<Icon as={LuChevronLeft} />}
				m={8}
				isRound
				size="lg"
			/>
			<IconButton
				aria-label="previous step"
				position="absolute"
				transformOrigin="center"
				top="50%"
				right={0}
				zIndex="overlay"
				onClick={() =>
					setStepActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
				}
				icon={<Icon as={LuChevronRight} />}
				m={8}
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
