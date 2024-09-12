"use client";

import { useBusy } from "@/hooks/use-busy";
import type { FormState } from "@/types/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FormEvent,
	type PropsWithChildren,
	createContext,
	useContext,
	useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

const FormStateContext = createContext<{
	formState: FormState;
	pending: boolean;
}>({ formState: undefined, pending: false });

interface FormStateProviderProps<TData extends z.ZodRawShape>
	extends PropsWithChildren {
	action: (formState: FormState, formData: FormData) => Promise<FormState>;
	schema: z.ZodObject<TData>;
}

export const FormStateProvider = <TData extends z.ZodRawShape>({
	action,
	children,
	schema,
}: FormStateProviderProps<TData>) => {
	const form = useForm<z.output<typeof schema>>({
		resolver: zodResolver(schema),
	});
	const [formState, setFormState] = useState<FormState>();
	const [pending, withBusy] = useBusy();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		form.handleSubmit(async (data) => {
			const result = await withBusy(action(formState, new FormData()));
			setFormState(result);
		})(e);
	};

	return (
		<FormStateContext.Provider value={{ formState, pending }}>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit}>{children}</form>
			</FormProvider>
		</FormStateContext.Provider>
	);
};

export const useFormStateValue = () => useContext(FormStateContext);
