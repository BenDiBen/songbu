"use client";

import { useFormStateValue } from "@/components/forms/form-state-provider";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";

export const FormError = () => {
	const { formState } = useFormStateValue();

	if (formState?.type === "error") {
		return (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>{formState.message}</AlertTitle>
			</Alert>
		);
	}

	return null;
};
