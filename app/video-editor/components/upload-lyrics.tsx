"use client";

import { Box, Flex, Input, InputGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { LyricsSearchResults } from "./lyrics-search-results";

export const UploadLyrics = () => {
	const [search, setSearch] = useState("");

	return (
		<Stack>
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
			<InputGroup startElement={<LuSearch />}>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for a song title..."
				/>
			</InputGroup>
		</Stack>
	);
};
