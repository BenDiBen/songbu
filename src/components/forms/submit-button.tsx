"use client";

import { Button, type ButtonProps } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
	children = "Submit",
	...props
}: ButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<>
			<Button
				rightIcon={pending ? <Spinner /> : undefined}
				isDisabled={pending}
				type="submit"
				{...props}
			>
				{children}
			</Button>
		</>
	);
};
