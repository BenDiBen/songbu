"use client";

import { FileDragAndDrop } from "@/components/forms/file-drag-and-drop";
import type { StepDefinitionProps } from "@/hooks/use-steps";
import { Container } from "@chakra-ui/react";
import type { CsvImportStepperState } from "./types";

const accept = { "text/csv": [".csv"] };

export const SelectFileStep = ({
	state: { file },
	onStateChange,
}: StepDefinitionProps<CsvImportStepperState>) => {
	return (
		<Container variant="app" width={{ base: "100vw", md: "xl" }}>
			<FileDragAndDrop
				accept={accept}
				onChange={(files: File[]) => {
					if (files.length === 0) {
						onStateChange({ file: undefined });
						return;
					}

					const file = files[0];
					onStateChange({ file });
				}}
				value={file}
			/>
		</Container>
	);
};
