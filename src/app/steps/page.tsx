import { Stepper } from "@/components/navigation/stepper";
import { Heading } from "@chakra-ui/react";
import { range } from "ramda";

const steps = range(0, 12).map((index) => ({
	id: index + 1,
	label: <Heading>{`Step ${index + 1}`}</Heading>,
	content: <Heading>Hello! Hello! Hello!</Heading>,
}));

export default function StepsPage() {
	return <Stepper steps={steps} />;
}
