import { Box, Center, Text } from "@chakra-ui/react";
import type { Frame } from "../../types";
import { useSection } from "./use-section";

interface FrameSectionProps {
	frame: Frame;
	index: number;
	duration: number;
	isSelected: boolean;
	onUpdate: (frame: Frame) => void;
	onDelete: () => void;
	onSeek: () => void;
	zoom: number;
	max?: number;
	min?: number;
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
			bg="secondary.emphasized"
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
			<Text px={2} fontSize="xs">
				{`Section  ${index + 1}`}
			</Text>
		</Center>
	);
};
