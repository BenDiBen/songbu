import { FileDragAndDrop } from "@/components/forms/file-drag-and-drop";
import { useCsvImportQuery } from "@/services/file/get-csv-import-query";
import { useCsvPreview } from "@/services/file/get-csv-preview";
import type { SongBookColumnMapping } from "@/types/song-book-column-mapping";
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { sum } from "ramda";
import { useCallback, useEffect, useState } from "react";
import type { ImportWizardProps } from "./types";

const accept = { "text/csv": [".csv"] };

const ARTIST_COLUMN_ALIASES = [
	"artist",
	"musician",
	"by",
	"composer",
	"performer",
	"band",
];

const TITLE_COLUMN_ALIASES = ["title", "name", "song"];

const DEFAULT_MAPPING = {
	artist: undefined,
	title: undefined,
};

export const ImportCsv = ({ state }: ImportWizardProps) => {
	const [file, setFile] = useState<File | undefined>(undefined);
	const { data: preview } = useCsvPreview(file);
	const [columnMapping, setColumnMapping] =
		useState<SongBookColumnMapping>(DEFAULT_MAPPING);
	const {
		data: songBook,
		error,
		isLoading,
	} = useCsvImportQuery(file, columnMapping);

	useEffect(() => {
		if (!preview?.headers) {
			setColumnMapping(DEFAULT_MAPPING);
		} else {
			setColumnMapping({
				artist: preview.headers.find((header) =>
					ARTIST_COLUMN_ALIASES.some((alias) =>
						header.toLocaleLowerCase().includes(alias),
					),
				),
				title: preview.headers.find((header) =>
					TITLE_COLUMN_ALIASES.some((alias) =>
						header.toLocaleLowerCase().includes(alias),
					),
				),
			});
		}
	}, [preview?.headers]);

	const handleFileSelect = useCallback((files: File[]) => {
		if (files.length === 0) {
			setFile(undefined);
			return;
		}

		const file = files[0];
		setFile(file);
	}, []);

	return (
		<VStack gap={8}>
			<FileDragAndDrop
				name="file"
				accept={accept}
				onChange={handleFileSelect}
			/>
			{preview && (
				<TableContainer>
					<Table variant="striped" size="sm">
						<Thead>
							<Tr>
								{preview.headers.map((header) => (
									<Th key={header}>{header}</Th>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{preview.rows.map((row, index) => (
								<Tr key={`row-${index}`}>
									{preview.headers.map((header) => (
										<Td key={header}>{row[header]}</Td>
									))}
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
			<Text>
				{JSON.stringify({
					artists: songBook?.length,
					songs: sum(songBook?.flatMap((x) => x.songs.length) ?? []),
				})}
			</Text>
			<Button type="submit">Submit</Button>
		</VStack>
	);
};
