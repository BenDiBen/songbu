"use client";

import type { FormState } from "@/types/form-state";
import {
	type FormEvent,
	type PropsWithChildren,
	createContext,
	useContext,
	useRef,
} from "react";
import { useFormState } from "react-dom";
import {
	type FieldValues,
	FormProvider,
	type UseFormReturn,
} from "react-hook-form";

const FormStateContext = createContext<FormState>(undefined);

interface FormStateProviderProps<
	TData extends FieldValues = Record<string, unknown>,
> extends PropsWithChildren {
	action: (formState: FormState, formData: FormData) => Promise<FormState>;
	form?: UseFormReturn<TData, unknown, undefined>;
}

export const FormStateProvider = <
	TData extends FieldValues = Record<string, unknown>,
>({
	action: inputAction,
	children,
	form,
}: FormStateProviderProps<TData>) => {
	const [formState, action] = useFormState(inputAction, undefined);
	const formRef = useRef<HTMLFormElement>(null);
	const handleSubmit =
		(form: UseFormReturn<TData, unknown, undefined>) =>
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const { current } = formRef;

			if (current) {
				form.handleSubmit(() => {
					action(new FormData(current));
				})(e);
			}
		};

	return (
		<FormStateContext.Provider value={formState}>
			{form ? (
				<FormProvider {...form}>
					<form action={action} ref={formRef} onSubmit={handleSubmit(form)}>
						{children}
					</form>
				</FormProvider>
			) : (
				<form action={action} ref={formRef}>
					{children}
				</form>
			)}
		</FormStateContext.Provider>
	);
};

export const useFormStateValue = () => useContext(FormStateContext);
