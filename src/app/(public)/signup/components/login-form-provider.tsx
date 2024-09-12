"use client";

import { signUp } from "@/actions/sign-up";
import { FormStateProvider } from "@/components/forms/form-state-provider";
import { schema } from "@/types/requests/sign-up";
import type { PropsWithChildren } from "react";

export const SignUpFormProvider = ({ children }: PropsWithChildren) => {
	return (
		<FormStateProvider action={signUp} schema={schema}>
			{children}
		</FormStateProvider>
	);
};
