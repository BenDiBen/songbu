"use client";

import { Box, Center, useToken } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";

const CARD_SIZE = "24rem";

const CARD_VARIANTS = {
	todo: ({ offset }: { offset: number }) => ({
		height: CARD_SIZE,
		width: CARD_SIZE,
		zIndex: undefined,
		translateX: `calc(${offset} * (${CARD_SIZE} + 16rem))`,
		transition: { type: "tween" },
	}),
	active: ({ offset }: { offset: number }) => ({
		width: "100vw",
		height: "100svh",
		borderRadius: "0",
		zIndex: 1000,
		translateX: `calc(${offset} * (${CARD_SIZE} + 16rem))`,
		transition: {
			width: { delay: 0.5, type: "tween" },
			height: { delay: 0.5, type: "tween" },
			borderRadius: { delay: 0.5, type: "tween" },
			zIndex: { delay: 0 },
		},
	}),
};

interface StepProps extends PropsWithChildren {
	activeStepIndex: number;
	stepIndex: number;
	label?: ReactNode;
}

export const Step = ({
	activeStepIndex,
	children,
	label,
	stepIndex,
}: StepProps) => {
	const colors = useToken("colors", [
		"green.600",
		"blue.600",
		"red.600",
		"teal.600",
		"orange.600",
	]);

	const isActive = activeStepIndex === stepIndex;

	return (
		<Center
			flexDirection="column"
			initial="todo"
			as={motion.div}
			bgColor={colors[stepIndex % 5]}
			position="absolute"
			custom={{ offset: stepIndex - activeStepIndex }}
			animate={isActive ? "active" : "todo"}
			variants={CARD_VARIANTS}
			borderRadius="10%"
		>
			{label}
			<Box
				animate={isActive ? "active" : "hidden"}
				as={motion.div}
				initial="hidden"
				overflow="hidden"
				mt={8}
				transformOrigin="center"
				variants={{
					hidden: {
						opacity: 0,
						height: 0,
						transition: {
							duration: 0.2,
							type: "tween",
						},
					},
					active: {
						opacity: 1,
						height: "auto",
						scaleY: 1,
						transition: {
							height: {
								delay: 0.5,
								duration: 0.5,
								type: "spring",
							},
							scale: {
								delay: 1,
								duration: 0.5,
								type: "tween",
							},
							opacity: {
								delay: 1,
								duration: 0.2,
								type: "tween",
							},
						},
					},
				}}
			>
				{children}
			</Box>
		</Center>
	);
};
