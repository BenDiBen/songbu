import { encode } from "html-entities";
import ky, { type Options } from "ky";

export const getArtist = async (
	name: string,
	options?: Options,
): Promise<Artist | undefined> => {
	const response = await ky.get<Payload>(
		`https://musicbrainz.org/ws/2/artist/?fmt=json&limit=1&query=${encode(name)}`,
		options,
	);

	const metadata = await response.json();
	return metadata.artists[0];
};

interface Payload {
	created: string;
	count: number;
	offset: number;
	artists: Artist[];
}

interface Artist {
	id: string;
	type: string;
	"type-id": string;
	score: number;
	name: string;
	"sort-name": string;
	country: string;
	area: Area;
	"begin-area": Area;
	isnis: string[];
	"life-span": LifeSpan;
	aliases: Alias[];
	tags: Tag[];
}

interface Area {
	id: string;
	type: string;
	"type-id": string;
	name: string;
	"sort-name": string;
	"life-span": LifeSpan;
}

interface LifeSpan {
	begin?: string;
	ended?: boolean | null;
}

interface Alias {
	"sort-name": string;
	name: string;
	locale: string | null;
	type: string | null;
	"type-id"?: string;
	primary: boolean | null;
	"begin-date": string | null;
	"end-date": string | null;
}

interface Tag {
	count: number;
	name: string;
}
