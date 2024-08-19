import ky, { type Options } from "ky";

type ArtistName = string;
type SongName = string;
type Songbook = Record<ArtistName, SongName[]>;

export const getSongbook = (name: string, options?: Options) =>
	ky.get<Songbook>(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/scrape/songbookslive?name=${name}`,
		options,
	);
