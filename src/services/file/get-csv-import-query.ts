import type { SongBook } from "@/types/song-book";
import type { SongBookColumnMapping } from "@/types/song-book-column-mapping";
import { useQuery } from "@tanstack/react-query";
import { filter, groupBy, is, map, path, pathOr, pipe, toPairs } from "ramda";
import { parseCsv } from "./parse-csv";

const toSong = (title: string) => ({ title });

export const getCsvImport = async (
	file: File | undefined,
	{ artist, title }: SongBookColumnMapping,
	options: { signal: AbortSignal },
): Promise<SongBook> => {
	const result: SongBook = [];

	if (!artist || !title) {
		return result;
	}

	try {
		const { rows } = await parseCsv(file, { ...options });
		const getArtist = pathOr("", [artist]);
		const getTitle = path<string>([title]);
		const groups = toPairs(groupBy(getArtist, rows));

		groups.forEach(([artist, items = []]) => {
			const songs = pipe(map(getTitle), filter(is(String)), map(toSong))(items);

			if (artist && songs.length > 0) {
				result.push({ name: artist, songs });
			}
		});

		return result;
	} catch (error) {
		throw new Error("Failed to import CSV");
	}
};

export const useCsvImportQuery = (
	file: File | undefined,
	mapping: SongBookColumnMapping,
) =>
	useQuery({
		queryKey: ["file", "import", file?.name, mapping.artist, mapping.title],
		queryFn: (options) => getCsvImport(file, mapping, options),
		retry: false,
	});
