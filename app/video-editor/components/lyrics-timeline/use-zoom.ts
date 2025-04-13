import { useEffect, useRef, useState } from "react";

export const useZoom = () => {
	const [zoom, setZoom] = useState(5);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const div = ref.current;

		if (!div) {
			return;
		}

		const handleWheel = (event: globalThis.WheelEvent) => {
			event.preventDefault();

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
			console.log("detaching");
			div.removeEventListener("mouseenter", handleMouseEnter);
			div.removeEventListener("mouseleave", handleMouseLeave);
			div.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return { zoom, ref, width: `${100 * zoom}%` };
};
