import ky, { type Options } from "ky";

type Arguments = { title: string; artist: string };

const getParams = ({ title, artist }: Arguments) =>
	new URLSearchParams({
		q: `${artist} ${title}`,
		access_token: process.env.NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN ?? "",
	});

export const getSongs = (args: Arguments, options?: Options) =>
	ky.get<GeniusPayload>(
		`https://api.genius.com/search?${getParams(args).toString()}`,
		options,
	);
