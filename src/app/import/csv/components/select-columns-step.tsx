"use client";

import { useCsvPreview } from "@/services/file/get-csv-preview";
import {
	Card,
	Container,
	Table,
	TableContainer,
	Td,
	Text,
	Th,
	Tr,
} from "@chakra-ui/react";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";

const accept = { "text/csv": [".csv"] };

export const SelectColumnsStep = ({
	file,
}: {
	file: File;
}) => {
	const [columns, setColumns] = useState<string[]>([]);

	const { data: preview } = useCsvPreview(file);

	useEffect(() => setColumns(preview?.headers ?? []), [preview?.headers]);

	return (
		<Container variant="app" width="100vw">
			<Reorder.Group
				axis="x"
				values={columns}
				onReorder={setColumns}
				style={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "flex-end",
					flexWrap: "nowrap",
				}}
			>
				{columns.map((columnName) => (
					<Reorder.Item
						key={columnName}
						value={columnName}
						style={{ listStyleType: "none" }}
					>
						<Card>
							<TableContainer>
								<Table variant="striped">
									<Tr>
										<Th maxW="xs">{columnName}</Th>
									</Tr>
									{preview?.rows.map((row, index) => (
										<Tr key={`${index}-${row[columnName]}`}>
											<Td maxW="xs">
												<Text
													isTruncated
													whiteSpace="nowrap"
													textOverflow="ellipsis"
												>
													{row[columnName]}
												</Text>
											</Td>
										</Tr>
									))}
								</Table>
							</TableContainer>
						</Card>
					</Reorder.Item>
				))}
			</Reorder.Group>
		</Container>
	);
};
