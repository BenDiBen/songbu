"use client";

import { useCsvPreview } from "@/services/file/get-csv-preview";
import type { SongBookColumnMapping } from "@/types/song-book-column-mapping";
import {
	Box,
	Card,
	CardHeader,
	FormLabel,
	HStack,
	Icon,
	IconButton,
	Portal,
	Spacer,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
	type DragEvent,
	type RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { LuX } from "react-icons/lu";

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
}: {
	file: File;
}) => {
	const [columnMapping, setColumnMapping] =
		useState<SongBookColumnMapping>(DEFAULT_MAPPING);
	const { data: preview } = useCsvPreview(file);

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

	const handleDrop = (e: DragEvent, field: string) => {
		const intersectingRef = refs.find(({ ref }) => intersectsWith(ref, e));
		const existingRef = refs.find(({ type }) => columnMapping[type] === field);
		setColumnMapping((prev) => ({
			...prev,
			...(existingRef && { [existingRef.type]: undefined }),
			...(intersectingRef && { [intersectingRef.type]: field }),
		}));
	};

	const handleRemove = (type: keyof SongBookColumnMapping) =>
		setColumnMapping((prev) => ({
			...prev,
			[type]: undefined,
		}));

	const isInList = (field: string) =>
		!Object.values(columnMapping).includes(field);

	return (
		<VStack spacing={4} align="stretch" ref={dragAreaRef} width="sm">
			<Text>{`Below is a list of the columns we found in the file ${file.name}.`}</Text>
			<Text>
				Please select the columns that represent the artist name and title of
				the song.
			</Text>
			{refs.map(({ type, ref }) => {
				const value = columnMapping[type];
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
							{value ? (
								<Card
									as={motion.div}
									layoutId={value}
									drag="y"
									dragConstraints={dragAreaRef}
									onDragEnd={(e) => handleDrop(e, value)}
								>
									<CardHeader>
										<HStack>
											<Text>{value}</Text>
											<Spacer />
											<IconButton
												aria-label="remove"
												variant="outline"
												isRound
												icon={<Icon as={LuX} />}
												m={-2}
												onClick={() => handleRemove(type)}
											/>
										</HStack>
									</CardHeader>
								</Card>
							) : (
								<Text
									height={16}
									color="gray.500"
								>{`Drop ${type} column here`}</Text>
							)}
						</Box>
					</VStack>
				);
			})}
			<Portal containerRef={dragAreaRef}>
				<VStack spacing={4} alignItems="stretch" maxH={40} overflowY="auto">
					{preview.headers.map((column) =>
						isInList(column) ? (
							<Portal key={column} containerRef={dragAreaRef}>
								<Card
									cursor="pointer"
									layoutId={column}
									mx={4}
									as={motion.div}
									drag="y"
									dragConstraints={dragAreaRef}
									dragSnapToOrigin
									onDragEnd={(e) => handleDrop(e, column)}
								>
									<CardHeader>{column}</CardHeader>
								</Card>
							</Portal>
						) : (
							<Card
								as={motion.div}
								mx={4}
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
			</Portal>
		</VStack>
	);
};
