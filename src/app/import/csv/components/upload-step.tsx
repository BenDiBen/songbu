"use client";

import { SongBook } from "@/app/components/song-book";
import { useGetCsvImportQuery } from "@/services/file/get-csv-import-query";
import type { SongBookColumnMapping } from "@/types/song-book-column-mapping";
import { Card, CardBody, Container } from "@chakra-ui/react";

const accept = { "text/csv": [".csv"] };

export const UploadStep = ({
	file,
	columnMapping,
}: {
	file: File | undefined;
	columnMapping: SongBookColumnMapping;
}) => {
	const { data = [] } = useGetCsvImportQuery(file, columnMapping);

	return (
		<Container variant="app" width={{ base: "100vw", md: "xl" }}>
			<Card>
				<CardBody>
					<SongBook songBook={data} />
				</CardBody>
			</Card>
		</Container>
	);
};
