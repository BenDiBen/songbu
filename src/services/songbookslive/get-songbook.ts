import ky, { type Options } from "ky";

export const getSongbook = (name: string, options?: Options) =>
	ky.get<Record<string, string>[]>(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/scrape/songbookslive?name=${name}`,
		options,
	);
