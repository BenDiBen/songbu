"use client";

import type { SongBook as SongBookType } from "@/types/song-book";
import {
	Box,
	HStack,
	Icon,
	IconButton,
	Spacer,
	Text,
	VStack,
	useToken,
} from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { LuChevronDown, LuChevronUp, LuMusic, LuUser } from "react-icons/lu";

const remToPixels = (rem: string) => {
	return (
		Number.parseFloat(rem) *
		Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
	);
};

interface SongBookProps {
	songBook: SongBookType;
}

export const SongBook = ({ songBook: { artists } }: SongBookProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [size] = useToken("sizes", ["8"]);
	const [expanded, setExpanded] = useState<Record<number, boolean>>({});

	const rowVirtualizer = useVirtualizer({
		count: artists.length,
		getScrollElement: () => ref.current,
		estimateSize: () => remToPixels(size),
		overscan: 0,
	});

	const virtualItems = rowVirtualizer.getVirtualItems();

	const stickyIndex = virtualItems[0]?.index;
	const stickyItem = expanded[stickyIndex] ? artists[stickyIndex] : undefined;

	return (
		<Box
			ref={ref}
			height="md"
			overflowY="auto"
			alignItems="stretch"
			overflowX="clip"
		>
			<Box position="relative" height={`${rowVirtualizer.getTotalSize()}px`}>
				{!!rowVirtualizer.scrollOffset && stickyItem && (
					<HStack
						as="button"
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
						onClick={() =>
							setExpanded((previous) => ({
								...previous,
								[stickyIndex]: !expanded[stickyIndex],
							}))
						}
					>
						<Icon as={LuUser} color="chakra-subtle-text" />
						<Text isTruncated textOverflow="ellipsis" as="b">
							{stickyItem.name}
						</Text>
						<Spacer />
						<IconButton
							aria-label={`expand ${stickyItem.name}`}
							size="xs"
							isRound
							icon={
								<Icon
									as={expanded[stickyIndex] ? LuChevronUp : LuChevronDown}
								/>
							}
							variant="ghost"
							colorScheme="gray"
						/>
					</HStack>
				)}
				{virtualItems.map((virtualRow) => (
					<VStack
						ref={rowVirtualizer.measureElement}
						textAlign="left"
						key={virtualRow.index}
						data-index={virtualRow.index}
						position="absolute"
						transform={`translateY(${virtualRow.start}px)`}
						top={0}
						left={0}
						w="100%"
						maxW="100%"
						gap={0}
					>
						<HStack
							as="button"
							px={2}
							h={8}
							w="100%"
							maxW="100%"
							backgroundColor="chakra-body-bg"
							onClick={() =>
								setExpanded((previous) => ({
									...previous,
									[virtualRow.index]: !expanded[virtualRow.index],
								}))
							}
						>
							<Icon as={LuUser} color="chakra-subtle-text" />
							<Text isTruncated textOverflow="ellipsis" as="b">
								{artists[virtualRow.index].name}
							</Text>
							<Spacer />
							<IconButton
								aria-label={`expand ${artists[virtualRow.index].name}`}
								size="xs"
								isRound
								icon={
									<Icon
										as={
											expanded[virtualRow.index] ? LuChevronUp : LuChevronDown
										}
									/>
								}
								variant="ghost"
								colorScheme="gray"
							/>
						</HStack>
						{expanded[virtualRow.index] &&
							artists[virtualRow.index].songs.map(({ title }) => (
								<HStack key={title} px={2} py={1} w="100%" maxW="100%">
									<Icon ml={2} as={LuMusic} color="chakra-subtle-text" />
									<Text isTruncated textOverflow="ellipsis">
										{title}
									</Text>
								</HStack>
							))}
					</VStack>
				))}
			</Box>
		</Box>
	);
};
