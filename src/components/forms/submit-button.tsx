"use client";

import { Button, type ButtonProps } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { type SyntheticEvent, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

export const SubmitButton = ({
	children = "Submit",
	...props
}: ButtonProps) => {
	const { pending } = useFormStatus();
	const form = useFormContext();
	const submitRef = useRef<HTMLButtonElement>(null);

	const handleClick = async (
		e: SyntheticEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		const success = await form.trigger();
		if (success) {
			submitRef.current?.click();
		}
	};

	return (
		<>
			<Button
				rightIcon={pending ? <Spinner /> : undefined}
				isDisabled={pending}
				onClick={handleClick}
				type="submit"
				{...props}
			>
				{children}
			</Button>
			<Button display="none" ref={submitRef} type="submit">
				Submit
			</Button>
		</>
	);
};
