interface Meta {
	status: number;
}

interface ReleaseDateComponents {
	year: number;
	month: number;
	day: number;
}

interface Stats {
	unreviewed_annotations: number;
	hot: boolean;
	pageviews?: number;
}

interface Artist {
	api_path: string;
	header_image_url: string;
	id: number;
	image_url: string;
	is_meme_verified: boolean;
	is_verified: boolean;
	name: string;
	url: string;
}

interface SongResult {
	annotation_count: number;
	api_path: string;
	artist_names: string;
	full_title: string;
	header_image_thumbnail_url: string;
	header_image_url: string;
	id: number;
	lyrics_owner_id: number;
	lyrics_state: string;
	path: string;
	primary_artist_names: string;
	pyongs_count: number | null;
	relationships_index_url: string;
	release_date_components: ReleaseDateComponents;
	release_date_for_display: string;
	release_date_with_abbreviated_month_for_display: string;
	song_art_image_thumbnail_url: string;
	song_art_image_url: string;
	stats: Stats;
	title: string;
	title_with_featured: string;
	url: string;
	featured_artists: Artist[];
	primary_artist: Artist;
	primary_artists: Artist[];
}

interface Hit {
	highlights: string[];
	index: string;
	type: string;
	result: SongResult;
}

interface Response {
	hits: Hit[];
}

interface GeniusPayload {
	meta: Meta;
	response: Response;
}
