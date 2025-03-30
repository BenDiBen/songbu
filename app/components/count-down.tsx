"use client";

import { HStack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const targetDate = dayjs(process.env.NEXT_PUBLIC_LAUNCH_DATE);

const getDifference = () => ({
	days: targetDate.diff(dayjs(), "day"),
	hours: 23 + targetDate.hour() - dayjs().hour(),
	minutes: 59 + targetDate.minute() - dayjs().minute(),
	seconds: 59 + targetDate.second() - dayjs().second(),
});

type DateDifference = ReturnType<typeof getDifference>;

const textShadow = `4px 0px 2px {colors.primary.600}, 
-4px 0px 2px {colors.primary.600}, 
0px -4px 2px {colors.primary.600}, 
0px 4px 2px {colors.primary.600},
0 0 40px {colors.primary.500},
0 0 80px {colors.primary.500},
0 0 120px {colors.secondary.300}`;

export const CountDown = () => {
	const [countdown, setCountdown] = useState<DateDifference>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const updateCountdown = () => setCountdown(getDifference);

		updateCountdown();

		const interval = setInterval(updateCountdown, 1000);

		return () => clearInterval(interval);
	}, []);

	if (!countdown) {
		return null;
	}

	return (
		<HStack>
			{Object.entries(countdown).map(([key, val]) => (
				<VStack key={key} w="3xs" fontFamily="tilt" gap={0}>
					<Text
						fontSize="120px"
						textShadow={{ _light: "unset", _dark: textShadow }}
						color={{ _light: "primary.500", _dark: "white" }}
					>
						{String(val).padStart(2, "0")}
					</Text>
					<Text fontSize="2xl" textShadow="text-glow.secondary">
						{key}
					</Text>
				</VStack>
			))}
		</HStack>
	);
};
