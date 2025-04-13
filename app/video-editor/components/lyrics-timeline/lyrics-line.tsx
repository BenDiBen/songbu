import { clamp } from "@/lib/utils";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import type { Line } from "../../types";

interface LyricsLineProps {
	line: Line;
	duration: number;
	isSelected: boolean;
	onUpdate: (line: Line) => void;
	onDelete: () => void;
	onSeek: () => void;
	zoom: number;
	max?: number;
	min?: number;
}

export const LyricsLine = ({
	line,
	duration,
	isSelected,
	onUpdate,
	onDelete,
	onSeek,
	...rest
}: LyricsLineProps) => {
	const { min = 0, max = duration } = rest;
	const [dragType, setDragType] = useState<
		"start" | "end" | "section" | "none"
	>("none");
	const [dragStartX, setDragStartX] = useState(0);
	const [originalStart, setOriginalStart] = useState(0);
	const [originalEnd, setOriginalEnd] = useState(0);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!sectionRef.current || dragType === "none") return;

			const timeline = sectionRef.current.parentElement;
			if (!timeline) return;

			const rect = timeline.getBoundingClientRect();
			const offsetX = e.clientX - rect.left;
			const newTimePosition = (offsetX / rect.width) * duration;

			switch (dragType) {
				case "start": {
					const newStart = Math.min(
						Math.max(min, newTimePosition),
						line.end - 0.5,
					);
					onUpdate({ ...line, start: newStart });
					break;
				}
				case "end": {
					const newEnd = Math.max(
						Math.min(max, newTimePosition),
						line.start + 0.5,
					);
					onUpdate({ ...line, end: newEnd });
					break;
				}
				case "section": {
					const maxDelta = max - originalEnd;
					const minDelta = min - originalStart;
					const deltaPercentage = (e.clientX - dragStartX) / rect.width;
					const delta = deltaPercentage * duration;
					const clampedDelta = clamp(delta, { min: minDelta, max: maxDelta });

					const newStart = originalStart + clampedDelta;
					const newEnd = originalEnd + clampedDelta;

					onUpdate({ ...line, start: newStart, end: newEnd });
					break;
				}
				default:
					break;
			}
		};

		const handleMouseUp = () => {
			setDragType("none");
		};

		if (dragType !== "none") {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [
		dragType,
		line,
		duration,
		dragStartX,
		originalStart,
		originalEnd,
		onUpdate,
		max,
		min,
	]);

	const handleStartHandleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragType("start");
	};

	const handleEndHandleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragType("end");
	};

	const handleSectionMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragType("section");
		setDragStartX(e.clientX);
		setOriginalStart(line.start);
		setOriginalEnd(line.end);
	};

	return (
		<Box
			ref={sectionRef}
			position="absolute"
			key={line.id}
			width={`${((line.end - line.start) / duration) * 100}%`}
			maxWidth={`${((line.end - line.start) / duration) * 100}%`}
			whiteSpace="nowrap"
			overflow="clip"
			left={`${(line.start / duration) * 100}%`}
			onMouseDown={handleSectionMouseDown}
			bg="bg.emphasized"
			border="none"
			borderLeft="solid"
			borderRight="solid"
			borderColor="primary.500"
			borderWidth="1px"
			cursor="move"
			aria-selected={dragType !== "none"}
			_selected={{
				bg: "primary.emphasized",
			}}
		>
			<Box
				position="absolute"
				left={0}
				top={0}
				bottom={0}
				width={2}
				cursor="col-resize"
				onMouseDown={handleStartHandleMouseDown}
				bg="transparent"
			/>
			<Box
				position="absolute"
				right={0}
				top={0}
				bottom={0}
				width={2}
				cursor="col-resize"
				onMouseDown={handleEndHandleMouseDown}
				bg="transparent"
			/>
			<Text p={2} fontSize="xs">
				{line.content}
			</Text>
		</Box>
	);
};
