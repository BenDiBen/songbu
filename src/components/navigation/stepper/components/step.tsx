"use client";

import { Box, Center, Fade, Icon, Tag, useToken } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";
import { LuCheck } from "react-icons/lu";

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
	lazy?: boolean;
}

export const Step = ({
	activeStepIndex,
	children,
	lazy,
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
			<Box position="absolute" top={8} right={8}>
				<Fade in={stepIndex < activeStepIndex}>
					<Tag borderRadius="full" bg="green.500" color="white" p={2}>
						<Icon as={LuCheck} height={8} width={8} />
					</Tag>
				</Fade>
			</Box>
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
				{lazy ? isActive && children : children}
			</Box>
		</Center>
	);
};
