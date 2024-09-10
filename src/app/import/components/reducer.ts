import { useReducer } from "react";
import type {
	ImportWizardAction,
	ImportWizardState,
} from "./types";

const steps: ImportWizardStep[] = [
	{ type: "import", label: "Import", description: "Select a source to import" },
	{
		type: "enrich",
		label: "Enrich",
		description: "Enrich your songs with metadata",
	},
	{ type: "upload", label: "Upload", description: "Upload your song book" },
];

const importWizardReducer = (
	state: ImportWizardState,
	{ type, payload }: ImportWizardAction,
): ImportWizardState => {
	const { importType } = state;
	switch (type) {
		case "SELECT_IMPORT_TYPE":
			return {
				steps,
				currentStepType: "import",
				importType: payload,
				canGoToNext: false,
			};
		case "SET_IMPORT_SOURCE": {
			const { importType } = state;
			return {
				steps,
				currentStepType: "import",
				importType,
				importSource: payload,
				canGoToNext: true,
			};
		}
		case "GO_TO_NEXT_STEP":
			switch (state.currentStepType) {
				case "import":
					if (state.importSource) {
						return {
							steps,
							currentStepType: "enrich",
							importType,
							importSource: state.importSource,
							canGoToNext: false,
						};
					}
					break;
				case "enrich":
					if (state.import && state.songbook) {
						return {
							steps,
							currentStepType: "upload",
							importType,
							importSource: state.importSource,
							import: state.import,
							songbook: state.songbook,
							canGoToNext: false,
						};
					}
					break;
			}
			break;
		case "SET_IMPORT":
			if (state.importSource) {
				return {
					steps,
					currentStepType: "enrich",
					importType,
					importSource: state.importSource,
					import: payload,
					canGoToNext: false,
				};
			}
			break;
		case "SET_SONGBOOK":
			if (
				state.currentStepType === "enrich" &&
				state.importSource &&
				state.import
			) {
				return {
					steps,
					currentStepType: "enrich",
					importType,
					importSource: state.importSource,
					import: state.import,
					songbook: payload,
					canGoToNext: false,
				};
			}
			break;
		default:
			break;
	}

	return state;
};

const initialState: ImportWizardState = {
	currentStepType: "import",
	importType: "csv",
	steps,
	canGoToNext: false,
};

export const useImportWizardReducer = () =>
	useReducer(importWizardReducer, initialState);
