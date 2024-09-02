export type AppUser = {
	id: string;
	user_metadata: {
		isAdmin: boolean;
		fullNames: string;
	};
};
