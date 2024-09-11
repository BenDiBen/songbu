import { z } from "zod";

export const schema = z.object({
	email: z.string().trim().min(1, "Required").email("Invalid email address"),
	password: z
		.string()
		.trim()
		.min(1, "Required")
		.min(8, "Password must be at least 8 characters long"),
});

export type SignUpRequest = z.output<typeof schema>;
