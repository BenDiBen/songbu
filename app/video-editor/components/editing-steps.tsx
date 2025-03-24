"use client";

import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { useEditingSteps } from "../providers";
import { STEPS } from "../steps";

export const EditingSteps = () => {
	const steps = useEditingSteps();

	return (
		<Steps.RootProvider value={steps}>
			<Steps.List>
				{STEPS.map((step, index) => (
					<Steps.Item key={step.title} index={index} title={step.title}>
						<Steps.Indicator />
						<Steps.Title>{step.title}</Steps.Title>
						<Steps.Separator />
					</Steps.Item>
				))}
			</Steps.List>

			{STEPS.map((step, index) => (
				<Steps.Content key={step.title} index={index}>
					{step.description}
				</Steps.Content>
			))}
			<Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

			<ButtonGroup size="sm" variant="outline">
				<Steps.PrevTrigger asChild>
					<Button>Prev</Button>
				</Steps.PrevTrigger>
				<Steps.NextTrigger asChild>
					<Button>Next</Button>
				</Steps.NextTrigger>
			</ButtonGroup>
		</Steps.RootProvider>
	);
};
