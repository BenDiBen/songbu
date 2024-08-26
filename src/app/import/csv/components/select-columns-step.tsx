"use client";

import { useCsvPreview } from "@/services/file/get-csv-preview";
import type { SongBookColumnMapping } from "@/types/song-book-column-mapping";
import { toSongBookImport } from "@/types/song-book-import";
import {
	Box,
	Card,
	CardBody,
	CardHeader,
	FormLabel,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type DragEvent, type RefObject, useEffect, useRef } from "react";
import { ColumnCard } from "./column-card";
import { SongBookPreview } from "./song-book-preview";

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
	file,
	onChange,
	value,
}: {
	file: File;
	value: SongBookColumnMapping;
	onChange: (value: SongBookColumnMapping | undefined) => void;
}) => {
	const { data: preview } = useCsvPreview(file);

	useEffect(() => {
		if (!preview?.headers) {
			onChange(undefined);
		} else {
			onChange({
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
		onChange({
			...value,
			...(existingRef && { [existingRef.type]: undefined }),
			...(intersectingRef && { [intersectingRef.type]: field }),
		});
	};

	const handleRemove = (type: keyof SongBookColumnMapping) =>
		onChange({
			...value,
			[type]: undefined,
		});

	const isInList = (field: string) => !Object.values(value).includes(field);
	const songBook = toSongBookImport(preview.rows, value);

	return (
		<VStack
			spacing={4}
			align="stretch"
			ref={dragAreaRef}
			width="sm"
			userSelect="none"
		>
			<Text>{`Below is a list of the columns we found in the file ${file.name}. Select the columns that represent the artist name and title of
				the song.`}</Text>
			{refs.map(({ type, ref }) => {
				const column = value[type];
				return (
					<VStack key={type} alignItems="stretch">
						<FormLabel>{`${type} column:`.toLocaleUpperCase()}</FormLabel>
						<Box
							as={motion.div}
							p={4}
							ref={ref}
							bg="gray.100"
							border="2px dashed gray"
							textAlign="center"
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
					</VStack>
				);
			})}
			<VStack spacing={4} alignItems="stretch" px={4}>
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
			</VStack>
			<Card mx={4}>
				<CardBody>
					<SongBookPreview songBook={songBook} />
				</CardBody>
			</Card>
		</VStack>
	);
};
