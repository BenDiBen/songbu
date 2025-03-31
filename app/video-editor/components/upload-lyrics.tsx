"use client";

import {
	Box,
	Flex,
	Input,
	InputGroup,
	Spinner,
	Stack,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useVideoContext } from "../providers";
import { LyricsSearchResults } from "./lyrics-search-results";
import { StepControls } from "./step-controls";

export const UploadLyrics = () => {
	const [search, setSearch] = useState("");
	const { lyrics, isLoading } = useVideoContext();

	return (
		<Stack align="stretch">
			<InputGroup startElement={<LuSearch />}>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for a song title..."
				/>
			</InputGroup>
			<LyricsSearchResults search={search} />
			<Flex>
				<Box flexGrow={1} border="1px" />
				<Text>OR</Text>
				<Box flexGrow={1} />
			</Flex>
			<Text>Paste your lyrics below:</Text>
			<Box position="relative" aria-busy={isLoading ? "true" : "false"}>
				<Textarea
					value={lyrics}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for a song title..."
					minH="sm"
				/>
				<VStack
					color="colorPalette.fg"
					display={isLoading ? "flex" : "none"}
					pos="absolute"
					inset="0"
					bg="bg/80"
					align="center"
					justify="center"
					h="full"
					w="full"
				>
					<Spinner />
					<Text color="colorPalette.fg">Loading...</Text>
				</VStack>
			</Box>
			<StepControls />
		</Stack>
	);
};
