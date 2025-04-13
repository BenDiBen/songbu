import { Box } from "@chakra-ui/react";
import { produce } from "immer";
import type { Dispatch, SetStateAction } from "react";
import type { Frame, Line } from "../../types";
import { LyricsLine } from "./lyrics-line";
import { useZoom } from "./use-zoom";

export const LyricsTimeline = ({
	frames,
	onUpdate,
}: { frames: Frame[]; onUpdate: Dispatch<SetStateAction<Frame[]>> }) => {
	const lines = frames.flatMap((frame) => frame.lines);
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
							onUpdate={handleLineUpdate}
							onDelete={() => handleDelete(line.id)}
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

	function handleLineUpdate(updateLine: Line) {
		onUpdate(
			produce((draft) => {
				for (const frame of draft) {
					for (const line of frame.lines) {
						if (line.id !== updateLine.id) {
							continue;
						}

						line.start = updateLine.start;
						line.end = updateLine.end;
					}
				}
			}),
		);
	}

	function handleDelete(lineId: string) {
		onUpdate(
			produce((draft) => {
				for (const frame of draft) {
					frame.lines = frame.lines.filter((line) => line.id !== lineId);
				}
			}),
		);
	}
};
