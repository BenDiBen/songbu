import { clamp } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SectionUpdateEvent<T extends { start: number; end: number }> = {
	target: T;
	type: "shiftStart" | "shiftEnd" | "shiftSection";
	value: number;
};

interface SectionOptions<T extends { start: number; end: number }> {
	duration: number;
	onUpdate: (section: T) => void;
	min?: number;
	max?: number;
}

export const useSection = <T extends { start: number; end: number }>(
	section: T,
	{ duration, onUpdate, ...rest }: SectionOptions<T>,
) => {
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

			const sectionContainer = sectionRef.current.parentElement;
			if (!sectionContainer) return;

			const rect = sectionContainer.getBoundingClientRect();
			const offsetX = e.clientX - rect.left;
			const newTimePosition = (offsetX / rect.width) * duration;

			switch (dragType) {
				case "start": {
					const newStart = Math.min(
						Math.max(min, newTimePosition),
						section.end - 0.5,
					);
					onUpdate({ ...section, start: newStart });
					break;
				}
				case "end": {
					const newEnd = Math.max(
						Math.min(max, newTimePosition),
						section.start + 0.5,
					);
					onUpdate({ ...section, end: newEnd });
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

					onUpdate({ ...section, start: newStart, end: newEnd });
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
		max,
		min,
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

	const handles = useMemo(
		() => [
			{ key: "left", left: 0, onMouseDown: onStartHandleMouseDown },
			{ key: "right", right: 0, onMouseDown: onEndHandleMouseDown },
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
