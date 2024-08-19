import { useQuery } from "@tanstack/react-query";
import { getSongbook } from "./get-songbook";

export const useSongbookQuery = (name: string) =>
	useQuery({
		queryKey: ["songbook", name],
		queryFn: ({ signal }) => getSongbook(name, { signal }),
	});
