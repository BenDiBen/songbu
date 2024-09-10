export type FormState =
	| {
			type: "error";
			message: string;
	  }
	| {
			type: "success";
			message?: string;
	  }
	| undefined;
