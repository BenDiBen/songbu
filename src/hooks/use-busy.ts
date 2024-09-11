import { useBoolean } from "@chakra-ui/react";
import { useCallback } from "react";

export type BusyValue = [boolean, <T>(action: Promise<T>) => Promise<T>];

export const useBusy = (initial = false): BusyValue => {
	const [isBusy, { on, off }] = useBoolean(initial);

	const withBusy = useCallback(
		async <T>(action: Promise<T>) => {
			try {
				on();
				return await action;
			} catch (error) {
				off();
				throw error;
			} finally {
				off();
			}
		},
		[off, on],
	);

	return [isBusy, withBusy];
};
