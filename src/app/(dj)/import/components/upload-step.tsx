"use client";

import { SongBook } from "@/app/components/song-book";
import type { StepDefinitionProps } from "@/hooks/use-steps";
import { useGetCsvImportQuery } from "@/services/file/get-csv-import-query";
import { Container } from "@chakra-ui/react";
import type { CsvImportStepperState } from "./types";

const accept = { "text/csv": [".csv"] };

export const UploadStep = ({
	state: { file, mapping },
}: StepDefinitionProps<CsvImportStepperState>) => {
	const { data = { name: "Loading", artists: [] } } = useGetCsvImportQuery(
		file,
		mapping,
	);

	return (
		<Container variant="app" width={{ base: "100vw", md: "xl" }}>
			<SongBook songBook={data} />
		</Container>
	);
};
