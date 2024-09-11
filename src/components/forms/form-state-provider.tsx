"use client";

import { useBusy } from "@/hooks/use-busy";
import type { FormState } from "@/types/form-state";
import {
	type FormEvent,
	type PropsWithChildren,
	createContext,
	useContext,
	useRef,
	useState,
} from "react";
import {
	type FieldValues,
	FormProvider,
	type UseFormReturn,
} from "react-hook-form";

const FormStateContext = createContext<{
	formState: FormState;
	pending: boolean;
}>({ formState: undefined, pending: false });

interface FormStateProviderProps<
	TData extends FieldValues = Record<string, unknown>,
> extends PropsWithChildren {
	action: (formState: FormState, formData: FormData) => Promise<FormState>;
	form: UseFormReturn<TData, unknown, undefined>;
}

export const FormStateProvider = <
	TData extends FieldValues = Record<string, unknown>,
>({
	action,
	children,
	form,
}: FormStateProviderProps<TData>) => {
	const [formState, setFormState] = useState<FormState>();
	const formRef = useRef<HTMLFormElement>(null);
	const [pending, withBusy] = useBusy();
	const handleSubmit =
		(form: UseFormReturn<TData, unknown, undefined>) =>
		(e: FormEvent<HTMLFormElement>) => {
			const { current } = formRef;

			if (current) {
				form.handleSubmit(async (data) => {
					const result = await withBusy(action(formState, new FormData()));
					setFormState(result);
				})(e);
			}
		};

	return (
		<FormStateContext.Provider value={{ formState, pending }}>
			<FormProvider {...form}>
				<form ref={formRef} onSubmit={handleSubmit(form)}>
					{children}
				</form>
			</FormProvider>
		</FormStateContext.Provider>
	);
};

export const useFormStateValue = () => useContext(FormStateContext);
