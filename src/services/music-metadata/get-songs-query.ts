import { useQuery } from "@tanstack/react-query";
import { getSongs } from "./get-songs";

export const useGetSongsQuery = ({
	artist,
	title,
}: { artist: string; title: string }) =>
	useQuery({
		queryKey: ["artist", artist, "title", title],
		queryFn: (options) => getSongs({ artist, title }, options),
	});
