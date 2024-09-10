"use client";

import type { FormState } from "@/types/form-state";
import { type PropsWithChildren, createContext, useContext } from "react";
import { useFormState } from "react-dom";

const FormStateContext = createContext<FormState>(undefined);

interface FormStateProviderProps extends PropsWithChildren {
	action: (formState: FormState, formData: FormData) => Promise<FormState>;
}

export const FormStateProvider = ({
	action: inputAction,
	children,
}: FormStateProviderProps) => {
	const [formState, action] = useFormState(inputAction, undefined);

	return (
		<FormStateContext.Provider value={formState}>
			<form action={action}>{children}</form>
		</FormStateContext.Provider>
	);
};

export const useFormStateValue = () => useContext(FormStateContext);
