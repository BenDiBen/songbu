import { Button, ButtonGroup, Steps } from "@chakra-ui/react";

export const StepControls = () => {
	return (
		<ButtonGroup justifyContent="center" size="sm" variant="outline">
			<Steps.PrevTrigger asChild>
				<Button>Prev</Button>
			</Steps.PrevTrigger>
			<Steps.NextTrigger asChild>
				<Button>Next</Button>
			</Steps.NextTrigger>
		</ButtonGroup>
	);
};
