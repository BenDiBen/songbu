import { filter, groupBy, is, map, path, pathOr, pipe, toPairs } from "ramda";
import type { SongBook } from "./song-book";
import type { SongBookColumnMapping } from "./song-book-column-mapping";

export type ArtistName = string;
export type SongTitle = string;

export const toSongBookImport = (
	data: Record<string, string>[],
	{ artist, title }: SongBookColumnMapping,
): SongBook => {
	if (!artist || !title) {
		return [];
	}

	const getArtist = pathOr("", [artist]);
	const getTitle = path<string>([title]);
	const groups = toPairs(groupBy(getArtist, data));

	return groups.map(([artist, items = []]) => ({
		name: artist,
		songs: pipe(
			map(getTitle),
			filter(is(String)),
			map((title) => ({ title })),
		)(items),
	}));
};
