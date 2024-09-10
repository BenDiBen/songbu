import type { StepDefinition } from "@/components/navigation/stepper";
import type { SongBook } from "@/types/song-book";
import type { SongBookImport } from "@/types/song-book-import";
import type { Dispatch } from "react";

export type ImportType = "songbookslive" | "csv" | "folder";

export type ImportSource =
	| { type: "songbookslive"; source: { name: string } }
	| { type: "csv" | "folder"; source: { path: string } };

export type ImportWizardState = {
	steps: StepDefinition[];
	importType: ImportType;
	canGoToNext: boolean;
} & (
	| {
			currentStepType: "import";
			importSource?: ImportSource;
	  }
	| {
			currentStepType: "enrich";
			importSource: ImportSource;
			import?: SongBookImport;
			songbook?: SongBook;
	  }
	| {
			currentStepType: "upload";
			importSource: ImportSource;
			import: SongBookImport;
			songbook: SongBook;
	  }
);

export type ImportWizardAction =
	| { type: "SELECT_IMPORT_TYPE"; payload: ImportType }
	| {
			type: "SET_IMPORT_SOURCE";
			payload: ImportSource;
	  }
	| {
			type: "GO_TO_NEXT_STEP";
			payload: undefined;
	  }
	| {
			type: "SET_IMPORT";
			payload: SongBookImport;
	  }
	| {
			type: "SET_SONGBOOK";
			payload: SongBook;
	  };

export type ImportWizardProps = {
	state: ImportWizardState;
	dispatch: Dispatch<ImportWizardAction>;
};

