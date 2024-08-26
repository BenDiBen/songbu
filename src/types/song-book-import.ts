import { filter, groupBy, is, map, path, pathOr, pipe, toPairs } from "ramda";
import type { SongBookColumnMapping } from "./song-book-column-mapping";

export type ArtistName = string;
export type SongTitle = string;
export type SongBookImport = Record<ArtistName, SongTitle[]>;

export const toSongBookImport = (
	data: Record<string, string>[],
	{ artist, title }: SongBookColumnMapping,
) => {
	const result: SongBookImport = {};

	if (!artist || !title) {
		return result;
	}

	const getArtist = pathOr("", [artist]);
	const getTitle = path<string>([title]);
	const groups = toPairs(groupBy(getArtist, data));

	groups.forEach(([artist, items = []]) => {
		const songs = pipe(map(getTitle), filter(is(String)))(items);
		result[artist] = songs;
	});

	return result;
};
