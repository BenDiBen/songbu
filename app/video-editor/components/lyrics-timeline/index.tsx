import { Box, VStack } from "@chakra-ui/react";
import { produce } from "immer";
import type { Dispatch, SetStateAction } from "react";
import type { Frame, Line } from "../../types";
import { type SECTION_UPDATE_TYPES, SectionUpdateTypes } from "./enums";
import { FrameSection } from "./frame-section";
import { LyricsLine } from "./lyrics-line";
import { useZoom } from "./use-zoom";

const MIN_INCREMENT = 1 / 15;

function getRangesFromFrames(
	frames: { current: Frame; prev: Frame; next: Frame },
	duration: number,
) {
	const start = {
		min: frames.prev?.end ?? 0,
		max: frames.current.lines[0]?.start ?? frames.current.end - MIN_INCREMENT,
	};
	const end = {
		min:
			frames.current.lines.at(-1)?.end ?? frames.current.start + MIN_INCREMENT,
		max: frames.next?.start ?? duration,
	};

	return { start, end };
}

function getRangesFromLines(
	frame: Frame,
	lines: { current: Line; prev: Line; next: Line },
	duration: number,
) {
	const start = {
		min: lines.prev?.end ?? frame.start,
		max: lines.current.end - MIN_INCREMENT,
	};
	const end = {
		min: lines.current.start + MIN_INCREMENT,
		max: lines.next?.start ?? frame.end,
	};

	return { start, end };
}

export const LyricsTimeline = ({
	frames,
	onUpdate,
}: { frames: Frame[]; onUpdate: Dispatch<SetStateAction<Frame[]>> }) => {
	const duration = frames.at(-1)?.end || 0;
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
								ranges={getRangesFromFrames(
									{ current: frame, prev: prevFrame, next: nextFrame },
									duration,
								)}
							/>
						);
					})}
				</Box>
				<Box minH={10}>
					{frames.map((frame) =>
						frame.lines.map((line, index) => {
							const prevLine = frame.lines[index - 1];
							const nextLine = frame.lines[index + 1];
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
									ranges={getRangesFromLines(
										frame,
										{ current: line, prev: prevLine, next: nextLine },
										duration,
									)}
								/>
							);
						}),
					)}
				</Box>
			</VStack>
		</Box>
	);

	function handleFrameUpdate(updateFrame: Frame, type: SECTION_UPDATE_TYPES) {
		onUpdate(
			produce((draft) => {
				for (let index = 0; index < draft.length; index++) {
					const frame = draft[index];
					if (frame.id !== updateFrame.id) {
						return;
					}

					if (type === SectionUpdateTypes.shift) {
						const shift = updateFrame.start - frame.start;
						for (const line of frame.lines) {
							line.start += shift;
							line.end += shift;
						}
					}

					frame.start = updateFrame.start;
					frame.end = updateFrame.end;
				}
			}),
		);
	}

	function handleLineUpdate(updateLine: Line, type: SECTION_UPDATE_TYPES) {
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
