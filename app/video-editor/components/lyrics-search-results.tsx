import { useGetLyricsQuery } from "@/services/get-lyrics-query";
import { useGetSongsQuery } from "@/services/get-songs-query";
import { Card, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useVideoContext } from "../providers";

export const LyricsSearchResults = ({ search }: { search: string }) => {
	const [debouncedSearch] = useDebounce(search, 1000);
	const { data: songs } = useGetSongsQuery({ title: debouncedSearch });
	const [selectedHitId, setSelectedHitId] = useState<number | undefined>(
		undefined,
	);
	const { setLyrics } = useVideoContext();
	const { data: lyrics } = useGetLyricsQuery(
		songs?.response.hits.find((hit) => hit.result.id === selectedHitId)?.result
			.url,
	);

	useEffect(() => {
		if (lyrics) {
			setLyrics(
				lyrics
					.map(({ content, hasBreak }) => content + (hasBreak ? "\n" : " "))
					.join(""),
			);
		}
	}, [lyrics, setLyrics]);

	if (!songs) {
		return null;
	}

	return (
		<Stack maxH="md" overflowY="auto" w="lg" p={4}>
			{songs.response.hits.map((hit, index) => (
				<Card.Root
					aria-selected={hit.result.id === selectedHitId}
					key={hit.result.id}
					size="sm"
					_hover={{ shadow: "text-glow.primary" }}
					_selected={{ bg: "primary.muted" }}
					cursor="pointer"
					onClick={() => {
						setSelectedHitId(hit.result.id);
						setLyrics(hit.result.full_title);
					}}
				>
					<Card.Body>
						<Card.Title>{hit.result.full_title}</Card.Title>
						<Card.Description>
							{hit.result.primary_artist.name}
						</Card.Description>
					</Card.Body>
				</Card.Root>
			))}
		</Stack>
	);
};
