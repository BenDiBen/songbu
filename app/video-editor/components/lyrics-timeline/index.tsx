import { Box, VStack } from "@chakra-ui/react";
import { produce } from "immer";
import type { Dispatch, SetStateAction } from "react";
import type { Frame, Line } from "../../types";
import { FrameSection } from "./frame-section";
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
			<VStack ref={ref} width={width} position="relative" align="stretch">
				<Box minH={4}>
					{frames.map((frame, index) => {
						const prevFrame = frames[index - 1];
						const nextFrame = frames[index + 1];
						return (
							<FrameSection
								key={frame.id}
								index={index}
								frame={frame}
								duration={duration}
								isSelected={false}
								onUpdate={handleFrameUpdate}
								onDelete={() => handleDelete(frame.id)}
								onSeek={() => {}}
								zoom={zoom}
								min={prevFrame?.end}
								max={nextFrame?.start}
							/>
						);
					})}
				</Box>
				<Box minH={10}>
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
			</VStack>
		</Box>
	);

	function handleFrameUpdate(updateFrame: Frame) {
		onUpdate(
			produce((draft) => {
				for (let index = 0; index < draft.length; index++) {
					const frame = draft[index];
					if (frame.id !== updateFrame.id) {
						return;
					}

					frame.start = updateFrame.start;
					frame.end = updateFrame.end;
				}
			}),
		);
	}

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
