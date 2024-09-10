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
	name: string;
	helperText?: string;
	inputProps?: InputProps;
}

export const FormInput = ({
	label,
	name,
	helperText,
	inputProps,
}: FormInputProps) => {
	const context = useFormContext();
	const errors = context?.formState.errors ?? {};
	const isError = !!errors[name];
	const errorMessage = errors[name]?.message;
	console.log({
		errors,
		isError,
		errorMessage,
		isString: isString(errorMessage),
	});

	return (
		<FormControl isInvalid={isError}>
			<FormLabel>{label}</FormLabel>
			<Input {...inputProps} name={name.toString()} />
			{!isError
				? helperText && <FormHelperText>{helperText}</FormHelperText>
				: isString(errorMessage) && (
						<FormErrorMessage fontSize="sm">{errorMessage}</FormErrorMessage>
					)}
		</FormControl>
	);
};
