"use server";

import type { FormState } from "@/types/form-state";
import { formDataToObject } from "@/utils/form-data/form-data-to-object";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
	email: z.string().email().toLowerCase(),
	password: z.string().min(6, "Password must contain at least 6 characters"),
	fullNames: z
		.string()
		.min(6, "Full name must contain at least 6 characters")
		.max(100, "Full name must not be more than 100 characters"),
});

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

	const { email, password, fullNames } = parsed.data;
	const names = fullNames.split(" ");
	const first_name = names[0];
	const last_name = names.length > 1 ? names.slice(-1)[0] : undefined;
	const adminAddresses = (process.env.ADMIN_EMAILS ?? "").split(",");
	const isAdmin = adminAddresses.includes(email);

	const data = {
		email,
		password,
		options: {
			data: {
				fullNames,
				first_name,
				last_name,
				isAdmin,
			},
		},
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
