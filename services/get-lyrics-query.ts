import { useQuery } from "@tanstack/react-query";
import { getLyrics } from "./get-lyrics";

export const useGetLyricsQuery = (url: string | undefined) =>
	useQuery({
		queryKey: ["lyrics", url],
		queryFn: async (options) => (url ? getLyrics(url) : Promise.resolve(null)),
	});
