"use client";

import type { SongBookImport } from "@/types/song-book-import";
import { Box, HStack, Icon, Text, useToken } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { LuMusic, LuUser } from "react-icons/lu";

const remToPixels = (rem: string) => {
	return (
		Number.parseFloat(rem) *
		Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
	);
};

const toItems = (songBook: SongBookImport) => {
	const result: { type: "artist" | "song"; name: string }[] = [];

	for (const [artist, songs] of Object.entries(songBook)) {
		result.push({ type: "artist", name: artist });

		for (const song of songs) {
			result.push({ type: "song", name: song });
		}
	}

	return result;
};

interface SongBookPreviewProps {
	songBook: SongBookImport;
}

export const SongBookPreview = ({ songBook }: SongBookPreviewProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [size] = useToken("sizes", ["8"]);

	const items = toItems(songBook);

	const rowVirtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => ref.current,
		estimateSize: () => remToPixels(size),
	});

	const virtualItems = rowVirtualizer.getVirtualItems();

	const getArtistIndex = () => {
		for (let index = virtualItems[0]?.index; index >= 0; index--) {
			const item = items[index];
			if (item && item.type === "artist") {
				return index;
			}
		}

		return 0;
	};

	const artistIndex = getArtistIndex();
	const stickyItem = items[artistIndex];

	return (
		<Box
			ref={ref}
			height="md"
			overflowY="auto"
			alignItems="stretch"
			overflowX="clip"
		>
			{!!rowVirtualizer.scrollOffset && stickyItem && (
				<HStack
					px={2}
					textAlign="left"
					position={"sticky"}
					h={size}
					top={0}
					left={0}
					w="100%"
					maxW="100%"
					backgroundColor="chakra-body-bg"
					zIndex="overlay"
				>
					<Icon as={LuUser} color="chakra-subtle-text" />
					<Text isTruncated textOverflow="ellipsis" as="b">
						{stickyItem.name}
					</Text>
				</HStack>
			)}
			<Box position="relative" height={`${rowVirtualizer.getTotalSize()}px`}>
				{virtualItems.map((virtualRow) => (
					<HStack
						px={2}
						textAlign="left"
						key={virtualRow.index}
						position="absolute"
						h={`${virtualRow.size}px`}
						top={0}
						left={0}
						transform={`translateY(${virtualRow.start}px)`}
						ml={items[virtualRow.index].type === "artist" ? undefined : 4}
						w="100%"
						maxW="100%"
						backgroundColor={
							items[virtualRow.index].type === "artist"
								? "chakra-body-bg"
								: undefined
						}
					>
						<Icon
							as={items[virtualRow.index].type === "song" ? LuMusic : LuUser}
							color="chakra-subtle-text"
						/>
						<Text
							isTruncated
							textOverflow="ellipsis"
							as={items[virtualRow.index].type === "artist" ? "b" : undefined}
						>
							{items[virtualRow.index].name}
						</Text>
					</HStack>
				))}
			</Box>
		</Box>
	);
};
