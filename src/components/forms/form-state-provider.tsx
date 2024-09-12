"use client";

import type { FormState } from "@/types/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type PropsWithChildren,
	type SyntheticEvent,
	createContext,
	useContext,
} from "react";
import { useFormState } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

const FormStateContext = createContext<{
	formState: FormState;
}>({ formState: undefined });

interface FormStateProviderProps<TData extends z.ZodRawShape>
	extends PropsWithChildren {
	action: (formState: FormState, formData: FormData) => Promise<FormState>;
	schema: z.ZodObject<TData>;
}

export const FormStateProvider = <TData extends z.ZodRawShape>({
	action: inputAction,
	children,
	schema,
}: FormStateProviderProps<TData>) => {
	const form = useForm<z.output<typeof schema>>({
		resolver: zodResolver(schema),
	});
	const [formState, action] = useFormState(inputAction, undefined);

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
		const isValid = await form.trigger();
		if (!isValid) {
			e.preventDefault();
		}
	};

	return (
		<FormStateContext.Provider value={{ formState }}>
			<FormProvider {...form}>
				<form action={action} onSubmitCapture={handleSubmit}>
					{children}
				</form>
			</FormProvider>
		</FormStateContext.Provider>
	);
};

export const useFormStateValue = () => useContext(FormStateContext);
