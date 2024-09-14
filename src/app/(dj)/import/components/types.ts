import type { SongBookColumnMapping } from "@/types/song-book-column-mapping";

export interface CsvImportStepperState {
	file?: File;
	mapping?: SongBookColumnMapping;
	name?: string;
}
