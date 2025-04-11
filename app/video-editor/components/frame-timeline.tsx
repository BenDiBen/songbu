"use client";

import { Box } from "@chakra-ui/react";
import { useState } from "react";
import type { Frame } from "../types";

export const FrameTimeline = ({
	frames,
	fps,
	durationInFrames,
}: { frames: Frame[]; fps: number; durationInFrames: number }) => {
	const [zoom, setZoom] = useState(5);

	const lines = frames.flatMap((frame) => frame.lines);
	const getLeft = (startInSeconds: number) =>
		((startInSeconds * fps) / durationInFrames) * zoom * 100;
	const getWidth = (startInSeconds: number, endInSeconds: number) =>
		(((endInSeconds - startInSeconds) * fps) / durationInFrames) * zoom * 100;

	return (
		<Box
			width="full"
			maxWidth="full"
			overflow="hidden"
			position="relative"
			height={8}
			bg={"red"}
		>
			{lines.map((line, index) => (
				<Box
					key={index}
					pos="absolute"
					top={0}
					left={`${getLeft(line.start)}%`}
					height="full"
					width={`${getWidth(line.start, line.end)}%`}
					border="solid blue 1px"
				>
					{getLeft(line.start)}
				</Box>
			))}
		</Box>
	);
};
