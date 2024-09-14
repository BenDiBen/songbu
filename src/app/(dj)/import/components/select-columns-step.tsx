"use client";

import type { StepDefinitionProps } from "@/hooks/use-steps";
import { useCsvPreview } from "@/services/file/get-csv-preview";
import type { SongBookColumnMapping } from "@/types/song-book-column-mapping";
import { toSongBookImport } from "@/types/song-book-import";
import {
	Box,
	Card,
	CardHeader,
	FormLabel,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type DragEvent, type RefObject, useEffect, useRef } from "react";
import { ColumnCard } from "./column-card";
import type { CsvImportStepperState } from "./types";

const ARTIST_COLUMN_ALIASES = [
	"artist",
	"musician",
	"by",
	"composer",
	"performer",
	"band",
];

const TITLE_COLUMN_ALIASES = ["title", "name", "song"];

const intersectsWith = (ref: RefObject<HTMLDivElement>, event: DragEvent) => {
	if (!ref.current) {
		return false;
	}

	const point = { x: event.clientX, y: event.clientY };
	const rect = ref.current.getBoundingClientRect();

	return (
		point.x >= rect.left &&
		point.x <= rect.right &&
		point.y >= rect.top &&
		point.y <= rect.bottom
	);
};

export const SelectColumnsStep = ({
	state: { mapping, file },
	onChange,
}: StepDefinitionProps<CsvImportStepperState>) => {
	const { data: preview } = useCsvPreview(file);

	const value = mapping ?? { artist: undefined, title: undefined };

	useEffect(() => {
		if (!preview?.headers) {
			onChange("mapping")(undefined);
		} else {
			onChange("mapping")({
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
	}, [preview?.headers, onChange]);

	const dragAreaRef = useRef<HTMLDivElement>(null);
	const artistRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	if (!preview?.headers) {
		return <Spinner size="xl" />;
	}

	const refs: {
		type: keyof SongBookColumnMapping;
		ref: RefObject<HTMLDivElement>;
	}[] = [
		{ type: "artist", ref: artistRef },
		{ type: "title", ref: titleRef },
	];

	const handleDrop = (field: string) => (e: DragEvent) => {
		const intersectingRef = refs.find(({ ref }) => intersectsWith(ref, e));
		const existingRef = refs.find(({ type }) => value[type] === field);
		onChange("mapping")({
			...value,
			...(existingRef && { [existingRef.type]: undefined }),
			...(intersectingRef && { [intersectingRef.type]: field }),
		});
	};

	const handleRemove = (type: keyof SongBookColumnMapping) =>
		onChange("mapping")({
			...value,
			[type]: undefined,
		});

	const isInList = (field: string) => !Object.values(value).includes(field);
	const songBook = toSongBookImport(preview.rows, value);

	return (
		<Stack
			spacing={20}
			align="stretch"
			ref={dragAreaRef}
			width={{ base: "100%", sm: "sm" }}
			userSelect="none"
		>
			<Text color="chakra-subtle-text">
				Select the columns that represent the artist name and title of the song.
			</Text>
			<Stack>
				{refs.map(({ type, ref }) => {
					const column = value[type];
					return (
						<Stack key={type} alignItems="stretch">
							<FormLabel m={0}>{`${type
								.split(" ")
								.map(
									(word) => (word[0] ?? "").toLocaleUpperCase() + word.slice(1),
								)
								.join(" ")} Column:`}</FormLabel>
							<Box
								as={motion.div}
								p={4}
								ref={ref}
								textAlign="center"
								layerStyle="drop-area"
							>
								{column ? (
									<ColumnCard
										column={column}
										dragConstraints={dragAreaRef}
										onDragEnd={handleDrop(column)}
										onRemoveClick={() => handleRemove(type)}
									/>
								) : (
									<Text
										height={16}
										color="chakra-subtle-text"
									>{`Drop ${type} column here`}</Text>
								)}
							</Box>
						</Stack>
					);
				})}
			</Stack>
			<Stack alignItems="stretch" px={4}>
				<FormLabel m={0}>Columns:</FormLabel>
				{preview.headers.map((column) =>
					isInList(column) ? (
						<ColumnCard
							key={column}
							column={column}
							dragConstraints={dragAreaRef}
							onDragEnd={handleDrop(column)}
						/>
					) : (
						<Card
							as={motion.div}
							variants={{
								hidden: { opacity: 0.0 },
								visible: { opacity: 0.3 },
							}}
							initial="hidden"
							animate="visible"
							key={`${column}-placeholder`}
						>
							<CardHeader>{column}</CardHeader>
						</Card>
					),
				)}
			</Stack>
		</Stack>
	);
};
