"use client";

import { Box } from "@chakra-ui/react";
import type { PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import type { Frame } from "../types";

type LineModel = {
	key: string;
	frameIndex: number;
	lineIndex: number;
	time: {
		start: number;
		end: number;
		min: number;
		max: number;
	};
};

const buildLineModels = (frames: Frame[], durationInSeconds: number) =>
	frames
		.flatMap((frame, frameIndex) =>
			frame.lines.map((line, lineIndex) => ({
				...line,
				lineIndex,
				frameIndex,
				key: `${frameIndex}-${lineIndex}`,
			})),
		)
		.reduce<LineModel[]>((acc, line) => {
			const previous = acc.at(-1);

			if (previous) {
				previous.time.max = line.start;
			}

			acc.push({
				...line,
				time: {
					...line,
					min: previous ? previous.time.end : 0,
					max: durationInSeconds,
				},
			});

			return acc;
		}, []);

export const FrameTimeline = ({
	frames,
	fps,
	durationInFrames,
	playerRef,
	onLineChange,
}: {
	frames: Frame[];
	fps: number;
	durationInFrames: number;
	playerRef: PlayerRef;
	onLineChange: (e: {
		frameIndex: number;
		lineIndex: number;
		position: "start" | "end";
		value: number;
	}) => void;
}) => {
	const [zoom, setZoom] = useState(5);
	const [currentFrame, setCurrentFrame] = useState(0);
	const timelineRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleTimeUpdate = (e: {
			detail: { frame: number };
		}) => setCurrentFrame(e.detail.frame);

		playerRef.addEventListener("timeupdate", handleTimeUpdate);

		return () => playerRef.removeEventListener("timeupdate", handleTimeUpdate);
	}, [playerRef]);

	const lines = frames.flatMap((frame) => frame.lines);
	const getLeft = (startInSeconds: number) =>
		((startInSeconds * fps) / durationInFrames) * 100;
	const getWidth = (startInSeconds: number, endInSeconds: number) =>
		(((endInSeconds - startInSeconds) * fps) / durationInFrames) * 100;

	useEffect(() => {
		const div = timelineRef.current;

		if (!div) {
			return;
		}

		const handleWheel = (event: globalThis.WheelEvent) => {
			event.preventDefault(); // prevent scroll from affecting the page

			const delta = -event.deltaY;
			const zoomFactor = 1.2;

			setZoom((prevZoom) => {
				const newZoom =
					delta > 0
						? prevZoom * zoomFactor
						: Math.max(0.1, prevZoom / zoomFactor);
				return newZoom;
			});
		};

		const handleMouseEnter = () => {
			div.addEventListener("wheel", handleWheel, { passive: false });
		};

		const handleMouseLeave = () => {
			div.removeEventListener("wheel", handleWheel);
		};

		div.addEventListener("mouseenter", handleMouseEnter);
		div.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			div.removeEventListener("mouseenter", handleMouseEnter);
			div.removeEventListener("mouseleave", handleMouseLeave);
			div.removeEventListener("wheel", handleWheel);
		};
	}, [timelineRef.current]);

	const lineModels = buildLineModels(frames, durationInFrames / fps);

	return (
		<Box overflow="clip" minH={8} h={8} bg="blue">
			<Box
				width={`${100 * zoom}%`}
				ref={timelineRef}
				position="relative"
				minH={8}
				h={8}
				bg="red"
			>
				{lines.map((line, index) => (
					<Box
						key={index}
						colorPalette="secondary"
						pos="absolute"
						top={0}
						left={`${getLeft(line.start)}%`}
						minH={8}
						h={8}
						width={`${getWidth(line.start, line.end)}%`}
						borderColor="colorPalette.emphasized"
						borderStyle="solid"
						borderWidth={1}
					/>
				))}
			</Box>
		</Box>
	);
};
