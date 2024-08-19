import { isString } from "@/utils/types/is-string";
import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Input, type InputProps } from "@chakra-ui/input";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface FormInputProps<TData extends FieldValues> {
	errors?: FieldErrors<TData>;
	label: string;
	name: keyof TData;
	helperText?: string;
	inputProps?: InputProps;
}

export const FormInput = <TData extends FieldValues>({
	errors = {},
	label,
	name,
	helperText,
	inputProps,
}: FormInputProps<TData>) => {
	const isError = !!errors[name];
	const errorMessage = errors[name]?.message;

	return (
		<FormControl isInvalid={isError}>
			<FormLabel>{label}</FormLabel>
			<Input {...inputProps} name={name.toString()} />
			{isError
				? helperText && <FormHelperText>{helperText}</FormHelperText>
				: isString(errorMessage) && (
						<FormErrorMessage>{errorMessage}</FormErrorMessage>
					)}
		</FormControl>
	);
};
