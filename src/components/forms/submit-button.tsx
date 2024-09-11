"use client";

import { Button, type ButtonProps } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useFormStateValue } from "./form-state-provider";

export const SubmitButton = ({
	children = "Submit",
	...props
}: ButtonProps) => {
	const { pending } = useFormStateValue();
	return (
		<Button
			rightIcon={pending ? <Spinner /> : undefined}
			isDisabled={pending}
			type="submit"
			{...props}
		>
			{children}
		</Button>
	);
};
