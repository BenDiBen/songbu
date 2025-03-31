import { useGetSongsQuery } from "@/services/get-songs-query";
import { Card, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { scrapeLyrics } from "../actions/scrape-lyrics";
import { useVideoContext } from "../providers";

export const LyricsSearchResults = ({ search }: { search: string }) => {
	const [debouncedSearch] = useDebounce(search, 1000);
	const { data: songs } = useGetSongsQuery({ title: debouncedSearch });
	const [selectedHitId, setSelectedHitId] = useState<number | undefined>(
		undefined,
	);
	const { setLyrics, setIsLoading } = useVideoContext();

	useEffect(() => {
		async function loadLyrics() {
			const url = songs?.response.hits.find(
				(hit) => hit.result.id === selectedHitId,
			)?.result.url;

			if (!url) {
				return;
			}

			setIsLoading(true);

			try {
				const lyrics = await scrapeLyrics(url);

				if (!lyrics) {
					return;
				}

				setLyrics(
					lyrics
						.map(
							({ content, hasBreak }) => content + (hasBreak ? "\n\n" : "\n\n"),
						)
						.join(""),
				);
			} finally {
				setIsLoading(false);
			}
		}

		loadLyrics();
	}, [setLyrics, setIsLoading, selectedHitId, songs]);

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
