import type { SongBook } from "@/types/song-book";
import { useQuery } from "@tanstack/react-query";
import { getSongBookMetadata } from "./get-song-book-metadata";

export const useSongBookMetadataQuery = (
	songBookName: string,
	songBook: SongBook,
	onProgress: (value: { total: number; processed: number }) => void,
) =>
	useQuery({
		queryKey: ["songbook", "metadata", songBookName],
		queryFn: (options) => getSongBookMetadata(songBook, onProgress, options),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
