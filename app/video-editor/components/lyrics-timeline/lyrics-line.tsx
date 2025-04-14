import { Box, Text } from "@chakra-ui/react";
import type { Line } from "../../types";
import type { SECTION_UPDATE_TYPES } from "./enums";
import { useSection } from "./use-section";

interface LyricsLineProps {
	line: Line;
	duration: number;
	isSelected: boolean;
	onUpdate: (line: Line, type: SECTION_UPDATE_TYPES) => void;
	onDelete: () => void;
	onSeek: () => void;
	zoom: number;
	ranges: SectionRanges;
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
	const { sectionRef, onSectionMouseDown, handles, dragType } = useSection(
		line,
		{ duration, onUpdate, ...rest },
	);

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
			onMouseDown={onSectionMouseDown}
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
				/>
			))}
			<Text p={2} fontSize="xs">
				{line.content}
			</Text>
		</Box>
	);
};
