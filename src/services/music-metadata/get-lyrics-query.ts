import { useQuery } from "@tanstack/react-query";
import { getLyrics } from "./get-lyrics";
import { getSongs } from "./get-songs";

export const useGetLyricsQuery = ({
	artist,
	title,
}: { artist: string; title: string }) =>
	useQuery({
		queryKey: ["artist", artist, "title", title, "lyrics"],
		queryFn: async (options) => {
			const songs = await getSongs({ artist, title }, options).json();

			if (songs.response.hits.length === 0) {
				return undefined;
			}

			return await getLyrics(songs.response.hits[0].result.url);
		},
	});
