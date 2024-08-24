"use client";

import { Button, Center, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { head, range, slice } from "ramda";
import { useState } from "react";

const steps = range(0, 12).map((index) => ({
	label: "Test",
	content: <Heading>{`Step ${index + 1}`}</Heading>,
}));

const getN = (n: number) => head(slice(n, n + 1, steps));

const data = {
	0: [0, 1, -2, -1],
	1: [0, 1, 2, -1],
	2: [0, 1, 2, 3],
	3: [4, 1, 2, 3],
	4: [4, 5, 2, 3],
	5: [4, 5, 6, 3],
	6: [4, 5, 6, 7],
	7: [8, 5, 6, 7],
};

export default function RotatingCube() {
	const size = 200; // Size of the cube faces
	const [step, setStep] = useState(0);

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				position: "relative",
				overflow: "clip",
			}}
		>
			<Button
				position="absolute"
				transformOrigin="-50% - 50%"
				top="50%"
				right={0}
				zIndex="overlay"
				onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
			>
				Next
			</Button>
			<Button
				position="absolute"
				transformOrigin="-50% - 50%"
				top="50%"
				left={0}
				zIndex="overlay"
				onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
			>
				Prev
			</Button>
			<motion.div
				style={{
					width: "100vw",
					height: "100vh",
					position: "absolute",
					transformStyle: "preserve-3d", // Ensures 3D transforms are maintained
				}}
				animate={{ rotateY: -90 * step }} // Rotate the cube around the Y-axis
				transition={{
					duration: 0.5,
					ease: "easeInOut",
				}}
			>
				<Center
					bg="green.200"
					position="absolute"
					width="full"
					height="full"
					transform="translateZ(50vw)"
				>
					<Heading size="3xs">
						{getN(Math.trunc((step + 1) / 4) * 4)?.content}
					</Heading>
				</Center>
				<Center
					bg="green.400"
					position="absolute"
					width="full"
					height="full"
					transform="rotateY(90deg) translateZ(50vw)"
				>
					{getN(Math.trunc(step / 4) * 4 + 1)?.content}
				</Center>
				<Center
					bg="green.600"
					position="absolute"
					width="full"
					height="full"
					transform="rotateY(180deg) translateZ(50vw)"
				>
					{getN(Math.trunc((step + 3) / 4) * 4 - 2)?.content}
				</Center>
				{/* Right Face */}
				<Center
					bg="green.800"
					position="absolute"
					width="full"
					height="full"
					transform="rotateY(270deg) translateZ(50vw)"
				>
					{getN(Math.trunc((step + 2) / 4) * 4 - 1)?.content}
				</Center>
			</motion.div>
		</div>
	);
}
