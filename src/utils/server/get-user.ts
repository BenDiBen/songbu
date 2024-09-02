import type { AppUser } from "@/types/app-user";
import { headers } from "next/headers";
import { z } from "zod";

const schema = z.object({
	id: z.string(),
	user_metadata: z.object({
		isAdmin: z.boolean(),
		fullNames: z.string(),
	}),
});

export const getUser = (): AppUser | undefined => {
	const headerValue = headers().get("x-user");

	if (!headerValue) {
		return undefined;
	}

	const parsed = schema.safeParse(JSON.parse(headerValue));

	return parsed?.success ? parsed.data : undefined;
};
