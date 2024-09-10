"use client";

import type { FormState } from "@/types/form-state";
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useRef,
} from "react";
import { useFormState } from "react-dom";
import { FormProvider, type UseFormReturn } from "react-hook-form";

const FormStateContext = createContext<FormState>(undefined);

interface FormStateProviderProps extends PropsWithChildren {
	action: (formState: FormState, formData: FormData) => Promise<FormState>;
	form?: UseFormReturn<
		Record<string, unknown>,
		unknown,
		Record<string, unknown> | undefined
	>;
}

export const FormStateProvider = ({
	action: inputAction,
	children,
	form,
}: FormStateProviderProps) => {
	const [formState, action] = useFormState(inputAction, undefined);
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<FormStateContext.Provider value={formState}>
			{form ? (
				<FormProvider {...form}>
					<form
						action={action}
						ref={formRef}
						onSubmit={(evt) => {
							evt.preventDefault();
							if (formRef.current) {
								form.handleSubmit(() => {
									action(new FormData(formRef.current));
								})(evt);
							}
						}}
					>
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
