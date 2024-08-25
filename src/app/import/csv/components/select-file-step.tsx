"use client";

import { FileDragAndDrop } from "@/components/forms/file-drag-and-drop";
import { Container } from "@chakra-ui/react";

const accept = { "text/csv": [".csv"] };

export const SelectFileStep = ({
	file,
	onFileSelected,
}: {
	file: File | undefined;
	onFileSelected: (file: File | undefined) => void;
}) => {
	return (
		<Container variant="app" width={{ base: "100vw", md: "xl" }}>
			<FileDragAndDrop
				accept={accept}
				onChange={(files: File[]) => {
					if (files.length === 0) {
						onFileSelected(undefined);
						return;
					}

					const file = files[0];
					onFileSelected(file);
				}}
				value={file}
			/>
		</Container>
	);
};
