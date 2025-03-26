"use client";

import { Slider, VStack } from "@chakra-ui/react";
import { useState } from "react";

export const SyncLyrics = () => {
	const values = [70, 75];
	const [isMouseOver, setIsMouseOver] = useState(false);
	const [mouseThumbPosition, setMouseThumbPosition] = useState(0);

	return (
		<VStack>
			<Slider.Root
				thumbAlignment="center"
				position="relative"
				minW="2xl"
				value={[mouseThumbPosition, ...values]}
				max={100}
				onMouseEnter={() => setIsMouseOver(true)}
				onMouseLeave={() => setIsMouseOver(false)}
				onMouseMove={(e) => {
					if (!isMouseOver) {
						return;
					}

					const rect = e.currentTarget.getBoundingClientRect();
					const percent = (e.clientX - rect.left) / rect.width;

					setMouseThumbPosition(Math.max(Math.min(percent * 100, 100), 0));
				}}
				py={4}
			>
				<Slider.Control>
					<Slider.Track />
					<Slider.Thumb index={0} opacity={isMouseOver ? 1 : 0}>
						<Slider.DraggingIndicator
							layerStyle="fill.solid"
							top="6"
							rounded="sm"
							px="1.5"
						>
							<Slider.ValueText />
						</Slider.DraggingIndicator>
					</Slider.Thumb>
					{values.map((value, index) => (
						<Slider.Thumb key={value} index={index + 1} />
					))}
				</Slider.Control>
			</Slider.Root>
		</VStack>
	);
};
