"use server";

import type { FormState } from "@/types/form-state";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const login = async (
	_formState: FormState,
	formData: FormData,
): Promise<FormState> => {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.error(error);
		return { type: "error", message: error.message };
	}

	revalidatePath("/", "layout");
	redirect("/");
};
