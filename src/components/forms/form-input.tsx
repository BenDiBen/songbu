"use client";

import { isString } from "@/utils/types/is-string";
import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Input, type InputProps } from "@chakra-ui/input";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
	label: string;
	helperText?: string;
	inputProps?: InputProps;
}

export const FormInput = ({
	label,
	helperText,
	inputProps,
}: FormInputProps) => {
	const context = useFormContext();
	const errors = context?.formState?.errors ?? {};
	const name = inputProps?.name ?? "";
	const isError = !!errors[name];
	const errorMessage = errors[name]?.message;

	return (
		<FormControl isInvalid={isError}>
			<FormLabel>{label}</FormLabel>
			<Input {...inputProps} {...context?.register(name)} />
			{!isError
				? helperText && <FormHelperText>{helperText}</FormHelperText>
				: isString(errorMessage) && (
						<FormErrorMessage fontSize="sm">{errorMessage}</FormErrorMessage>
					)}
		</FormControl>
	);
};
