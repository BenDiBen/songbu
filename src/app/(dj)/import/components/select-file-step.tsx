"use client";

import { FileDragAndDrop } from "@/components/forms/file-drag-and-drop";
import type { StepDefinitionProps } from "@/hooks/use-steps";
import {
	Container,
	FormControl,
	FormErrorMessage,
	Stack,
} from "@chakra-ui/react";
import type { CsvImportStepperState } from "./types";

const accept = { "text/csv": [".csv"] };

export const SelectFileStep = ({
	errors,
	state: { file },
	onStateChange,
}: StepDefinitionProps<CsvImportStepperState>) => {
	const error = errors?.find(
		(error) => error.path.join(".") === "file",
	)?.message;
	return (
		<Container variant="app" width={{ base: "100vw", md: "xl" }}>
			<Stack>
				<FormControl isInvalid={!!error}>
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
						invalid={!!error}
						value={file}
					/>
					{error && <FormErrorMessage>{error}</FormErrorMessage>}
				</FormControl>
			</Stack>
		</Container>
	);
};
