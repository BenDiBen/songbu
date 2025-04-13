import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { FRAMES } from "../frames";
import { LyricsLine } from "./lyrics-line";
import { useZoom } from "./use-zoom";

export const LyricsTimeline = () => {
	const [lines, setLines] = useState(FRAMES.flatMap((frame) => frame.lines));
	const duration = lines.at(-1)?.end || 0;
	const { ref, width, zoom } = useZoom();

	return (
		<Box w="full" overflow="clip" bg="secondary.subtle">
			<Box ref={ref} width={width} position="relative" minH={10}>
				{lines.map((line, index) => {
					const prevLine = lines[index - 1];
					const nextLine = lines[index + 1];
					return (
						<LyricsLine
							key={line.id}
							line={line}
							duration={duration}
							isSelected={false}
							onUpdate={(line) =>
								setLines((prev) =>
									prev.map((l) => (l.id === line.id ? line : l)),
								)
							}
							onDelete={() => {}}
							onSeek={() => {}}
							zoom={zoom}
							min={prevLine?.end}
							max={nextLine?.start}
						/>
					);
				})}
			</Box>
		</Box>
	);
};
