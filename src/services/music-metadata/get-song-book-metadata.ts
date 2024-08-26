import type { SongBook } from "@/types/song-book";
import type { Options } from "ky";
import { sum } from "ramda";
import { getArtist } from "./get-artist";
import { getSong } from "./get-song";

export const getSongBookMetadata = async (
	songBook: SongBook,
	onProgress: (value: { total: number; processed: number }) => void,
	options?: Options,
) => {
	const total = sum(songBook.map(({ songs }) => songs.length));
	let processed = 0;
	const result: SongBook = [];

	await Promise.all(
		songBook.map(async (artist) => {
			try {
				const artistResult = (await getArtist(artist.name, options)) ?? artist;

				const songs = await Promise.all(
					artist.songs.map(async (song) => {
						try {
							if (!artistResult.id) {
								return song;
							}
							const result = await getSong(
								artistResult.id,
								song.title,
								options,
							);
							const { id, title } = result ?? song;
							return { id, title };
						} catch {
							return { ...song };
						} finally {
							onProgress({ total, processed: ++processed });
						}
					}),
				);

				const { name, id } = artistResult;
				result.push({ name, id, songs: songs.map((song) => ({ ...song })) });
			} catch {
				result.push({
					name: artist.name,
					songs: artist.songs.map((song) => ({ ...song })),
				});
			}
		}),
	);

	return result;
};
