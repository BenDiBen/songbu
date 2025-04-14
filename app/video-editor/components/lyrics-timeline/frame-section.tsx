import { Box, Center, Text } from "@chakra-ui/react";
import type { Frame } from "../../types";
import type { SECTION_UPDATE_TYPES } from "./enums";
import { useSection } from "./use-section";

interface FrameSectionProps {
	frame: Frame;
	index: number;
	duration: number;
	isSelected: boolean;
	onUpdate: (frame: Frame, type: SECTION_UPDATE_TYPES) => void;
	onDelete: () => void;
	onSeek: () => void;
	zoom: number;
	ranges: SectionRanges;
}

export const FrameSection = ({
	frame,
	index,
	duration,
	isSelected,
	onUpdate,
	onDelete,
	onSeek,
	...rest
}: FrameSectionProps) => {
	const { sectionRef, onSectionMouseDown, handles, dragType } = useSection(
		frame,
		{ duration, onUpdate, ...rest },
	);

	return (
		<Center
			ref={sectionRef}
			position="absolute"
			key={frame.id}
			width={`${((frame.end - frame.start) / duration) * 100}%`}
			maxWidth={`${((frame.end - frame.start) / duration) * 100}%`}
			whiteSpace="nowrap"
			overflow="clip"
			left={`${(frame.start / duration) * 100}%`}
			onMouseDown={onSectionMouseDown}
			bg="secondary.muted"
			cursor="move"
			aria-selected={dragType !== "none"}
			_hover={{
				bg: dragType !== "none" ? undefined : "secondary.emphasized",
			}}
			_selected={{
				bg: "primary.emphasized",
			}}
		>
			{handles.map((props) => (
				<Box
					{...props}
					key={props.key}
					position="absolute"
					top={0}
					bottom={0}
					width={2}
					cursor="col-resize"
					bg="transparent"
					border="none"
					borderLeft={props.key === "start" ? "solid" : "none"}
					borderRight={props.key === "end" ? "solid" : "none"}
					borderColor="primary.muted"
					borderWidth="1px"
					_hover={{ bg: "primary.500" }}
				/>
			))}
			<Text px={2} fontSize="xs">
				{`Section  ${index + 1}`}
			</Text>
		</Center>
	);
};
