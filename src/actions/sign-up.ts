"use server";

import type { FormState } from "@/types/form-state";
import { schema } from "@/types/requests/sign-up";
import { formDataToObject } from "@/utils/form-data/form-data-to-object";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signUp = async (
	_formState: FormState,
	formData: FormData,
): Promise<FormState> => {
	const supabase = createClient();

	const parsed = schema.safeParse(formDataToObject(formData));

	if (!parsed.success) {
		console.info("Sign up request failed validation", {
			request: formData,
			error: parsed.error,
		});
		return { type: "error", message: parsed.error.issues[0].message };
	}

	const { email, password } = parsed.data;

	const data = {
		email,
		password,
	};

	const signUpResult = await supabase.auth.signUp(data);
	const { error } = signUpResult;

	if (error) {
		console.error(error);
		return { type: "error", message: error.message };
	}

	revalidatePath("/", "layout");
	redirect("/");
};
