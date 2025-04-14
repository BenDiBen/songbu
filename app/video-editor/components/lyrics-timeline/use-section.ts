import { clamp } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type SECTION_UPDATE_TYPES, SectionUpdateTypes } from "./enums";

type SectionUpdateEvent<T extends { start: number; end: number }> = {
	target: T;
	type: "shiftStart" | "shiftEnd" | "shiftSection";
	value: number;
};

interface SectionOptions<T extends { start: number; end: number }> {
	duration: number;
	onUpdate: (section: T, type: SECTION_UPDATE_TYPES) => void;
	ranges: SectionRanges;
}

export const useSection = <T extends { start: number; end: number }>(
	section: T,
	{ duration, onUpdate, ranges }: SectionOptions<T>,
) => {
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

			const sectionContainer = sectionRef.current.parentElement;
			if (!sectionContainer) return;

			const rect = sectionContainer.getBoundingClientRect();
			const offsetX = e.clientX - rect.left;
			const newTimePosition = (offsetX / rect.width) * duration;

			switch (dragType) {
				case "start": {
					const newStart = clamp(newTimePosition, {
						min: ranges.start.min,
						max: ranges.start.max,
					});
					onUpdate({ ...section, start: newStart }, SectionUpdateTypes.start);
					break;
				}
				case "end": {
					const newEnd = clamp(newTimePosition, {
						min: ranges.end.min,
						max: ranges.end.max,
					});
					onUpdate({ ...section, end: newEnd }, SectionUpdateTypes.end);
					break;
				}
				case "section": {
					const maxDelta = ranges.end.max - originalEnd;
					const minDelta = ranges.start.min - originalStart;

					const deltaPercentage = (e.clientX - dragStartX) / rect.width;
					const delta = deltaPercentage * duration;
					const clampedDelta = clamp(delta, { min: minDelta, max: maxDelta });

					const newStart = originalStart + clampedDelta;
					const newEnd = originalEnd + clampedDelta;

					onUpdate(
						{ ...section, start: newStart, end: newEnd },
						SectionUpdateTypes.shift,
					);
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
		section,
		duration,
		dragStartX,
		originalStart,
		originalEnd,
		onUpdate,
		ranges.start.min,
		ranges.start.max,
		ranges.end.min,
		ranges.end.max,
	]);

	const onSectionMouseDown = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setDragType("section");
			setDragStartX(e.clientX);
			setOriginalStart(section.start);
			setOriginalEnd(section.end);
		},
		[section.start, section.end],
	);

	const handles = useMemo<HandleReturn>(
		() => [
			{ key: "start", left: 0, onMouseDown: onStartHandleMouseDown },
			{ key: "end", right: 0, onMouseDown: onEndHandleMouseDown },
		],
		[],
	);

	return {
		handles,
		onSectionMouseDown,
		sectionRef,
		dragType,
	};

	function onStartHandleMouseDown(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		setDragType("start");
	}

	function onEndHandleMouseDown(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		setDragType("end");
	}
};
