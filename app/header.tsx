"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import { Logo } from "@/components/ui/logo";
import { Box, Container, Flex, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { useScroll } from "./hooks/use-scroll";

export const Header = () => {
	const scrolled = useScroll() > 1;

	//TODO: Fix yanky negative margin to place header
	return (
		<Box
			top={0}
			colorPalette="gray"
			position="sticky"
			zIndex="sticky"
			layerStyle="frostedGlass"
			data-scrolled={scrolled}
			mt={-32}
		>
			<Container>
				<Flex as="nav" align="center" gap={4}>
					<Link asChild aria-label="Home">
						<NextLink href="/">
							<Logo
								p={4}
								height={{ base: 24, sm: 32 }}
								color={{
									_light: "primary.500",
									_dark: "primary.contrast",
								}}
								viewBox="-2 -2 104 44"
							/>
						</NextLink>
					</Link>
					<Spacer />
					<ColorModeButton />
				</Flex>
			</Container>
		</Box>
	);
};
