"use client";

import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import type { Frame, Line } from "../types";

const getFrom = (frame: Frame) => frame.lines[0].start;
const getDuration = (frame: Frame) =>
	frame.lines[frame.lines.length - 1].end - getFrom(frame);
const getProgress = (line: Line, frame: number, fps: number) => {
	const startFrame = line.start * fps;
	if (startFrame > frame) {
		return 0;
	}

	const endFrame = line.end * fps;
	if (endFrame < frame) {
		return 1;
	}

	return (frame - startFrame) / (endFrame - startFrame);
};

export const LyricsFrame = ({ source }: { source: Frame }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<Sequence
			from={getFrom(source) * fps}
			durationInFrames={getDuration(source) * fps}
		>
			<Center w="full">
				<VStack>
					{source.lines.map((line, lineIndex) => (
						<Box key={lineIndex} position="relative" overflow="hidden">
							<Text fontSize="3xl">{line.content}</Text>
							<Text
								fontSize="3xl"
								position="absolute"
								top={0}
								color="primary.500"
								w={`${getProgress(line, frame, fps) * 100}%`}
								overflow="hidden"
								whiteSpace="nowrap"
								textShadow="text-glow.primary"
							>
								{line.content}
							</Text>
						</Box>
					))}
				</VStack>
			</Center>
		</Sequence>
	);
};
