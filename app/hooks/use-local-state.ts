"use client";

import { useEffect, useState } from "react";

export const useLocalState = <T>(key: string, defaultValue: T) => {
	const [state, setState] = useState<T>(() => {
		const value =
			typeof window !== "undefined" ? localStorage.getItem(key) : undefined;
		return value ? JSON.parse(value) : defaultValue;
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			console.log("Updating local storage");
			localStorage.setItem(key, JSON.stringify(state));
		}
	}, [key, state]);

	return [state, setState] as const;
};
