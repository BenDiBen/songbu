"use client";

import {
	Card,
	CardHeader,
	HStack,
	Icon,
	IconButton,
	Spacer,
	Text,
} from "@chakra-ui/react";
import { type DraggableProps, motion } from "framer-motion";
import type { DragEventHandler, MouseEventHandler } from "react";
import { LuX } from "react-icons/lu";
import { MdDragIndicator } from "react-icons/md";

interface ColumnCardProps extends Pick<DraggableProps, "dragConstraints"> {
	onDragEnd: DragEventHandler;
	column: string;
	onRemoveClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ColumnCard = ({
	column,
	dragConstraints,
	onDragEnd,
	onRemoveClick,
}: ColumnCardProps) => {
	return (
		<Card
			cursor="pointer"
			layoutId={column}
			as={motion.div}
			drag="y"
			dragConstraints={dragConstraints}
			dragSnapToOrigin
			onDragEnd={onDragEnd as unknown as DragEventHandler<HTMLDivElement>}
			key={column}
		>
			<CardHeader>
				<HStack>
					<Icon as={MdDragIndicator} />
					<Text>{column}</Text>
					<Spacer />
					{onRemoveClick && (
						<IconButton
							colorScheme="whiteAlpha"
							color="white"
							aria-label="remove"
							isRound
							icon={<Icon as={LuX} />}
							m={-2}
							onClick={onRemoveClick}
						/>
					)}
				</HStack>
			</CardHeader>
		</Card>
	);
};
