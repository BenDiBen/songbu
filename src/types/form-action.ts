import type { FormState } from "./form-state";

export type FormAction = (
	formState: FormState,
	formData: FormData,
) => Promise<FormState>;
