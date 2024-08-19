export type Song = { title: string; id?: string };
export type Artist = { name: string; id?: string; songs: Song[] };
export type SongBook = Artist[];
