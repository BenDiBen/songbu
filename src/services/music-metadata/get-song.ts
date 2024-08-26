import { encode } from "html-entities";
import ky, { type Options } from "ky";

export const getSong = async (
	artistId: string,
	title: string,
	options?: Options,
): Promise<Recording | undefined> => {
	const response = await ky.get<Payload>(
		`https://musicbrainz.org/ws/2/recording?fmt=json&limit=1&query=${encode(title)}%20AND%20arid:${artistId}%20AND%20comment:%22album%20version%22`,
		options,
	);

	const metadata = await response.json();
	return metadata.recordings[0];
};

interface Payload {
	created: string;
	count: number;
	offset: number;
	recordings: Recording[];
}

interface Recording {
	id: string;
	score: number;
	title: string;
	length: number;
	video: string | null;
	"artist-credit": ArtistCredit[];
	"first-release-date": string;
	releases: Release[];
}

interface ArtistCredit {
	name: string;
	artist: Artist;
}

interface Artist {
	id: string;
	name: string;
	"sort-name": string;
	aliases: Alias[];
}

interface Alias {
	"sort-name": string;
	name: string;
	locale: string | null;
	type: string | null;
	primary: boolean | null;
	"type-id"?: string;
	"begin-date": string | null;
	"end-date": string | null;
}

interface Release {
	id: string;
	"status-id": string;
	count: number;
	title: string;
	status: string;
	disambiguation?: string;
	"artist-credit": ArtistCredit[];
	"release-group": ReleaseGroup;
	date: string;
	country: string;
	"release-events": ReleaseEvent[];
	"track-count": number;
	media: Media[];
}

interface ReleaseGroup {
	id: string;
	"type-id": string;
	"primary-type-id": string;
	title: string;
	disambiguation?: string;
	"primary-type": string;
	"secondary-types": string[];
	"secondary-type-ids": string[];
}

interface ReleaseEvent {
	date: string;
	area: Area;
}

interface Area {
	id: string;
	name: string;
	"sort-name": string;
	"iso-3166-1-codes": string[];
}

interface Media {
	position: number;
	format: string;
	track: Track[];
	"track-count": number;
	"track-offset": number;
}

interface Track {
	id: string;
	number: string;
	title: string;
	length: number;
}
