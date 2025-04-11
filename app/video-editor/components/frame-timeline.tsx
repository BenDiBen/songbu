"use client";

import { Box } from "@chakra-ui/react";
import type { PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import type { Frame } from "../types";

export const FrameTimeline = ({
	frames,
	fps,
	durationInFrames,
	playerRef,
}: {
	frames: Frame[];
	fps: number;
	durationInFrames: number;
	playerRef: PlayerRef;
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
		((startInSeconds * fps) / durationInFrames) * zoom * 100;
	const getWidth = (startInSeconds: number, endInSeconds: number) =>
		(((endInSeconds - startInSeconds) * fps) / durationInFrames) * zoom * 100;

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

	return (
		<Box
			width="full"
			maxWidth="full"
			overflow="hidden"
			position="relative"
			height={8}
			ref={timelineRef}
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
				/>
			))}
			<Box
				pos="absolute"
				top={0}
				left={`${getLeft(currentFrame / fps)}%`}
				h="full"
				w={1}
				bg="primary.500"
				cursor="pointer"
			/>
		</Box>
	);
};
