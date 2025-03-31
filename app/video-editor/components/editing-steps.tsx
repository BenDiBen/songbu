"use client";

import { Box, Steps } from "@chakra-ui/react";
import { useEditingSteps } from "../providers";
import { STEPS } from "../steps";

export const EditingSteps = () => {
	const steps = useEditingSteps();

	return (
		<Box width="3xl">
			<Steps.List>
				{STEPS.map((step, index) => (
					<Steps.Item key={step.title} index={index} title={step.title}>
						<Steps.Indicator />
						<Steps.Title display={steps.value === index ? "block" : "none"}>
							{step.title}
						</Steps.Title>
						<Steps.Separator />
					</Steps.Item>
				))}
			</Steps.List>
			<Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
		</Box>
	);
};
