import { ColorModeButton } from "@/components/ui/color-mode";
import { Logo } from "@/components/ui/logo";
import { Box, Container, Flex, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export const Header = ({ isSticky }: { isSticky?: boolean }) => {
	const positionProps = isSticky
		? {
				colorPalette: "gray",
				layerStyle: "frostedGlass",
				mt: -32,
				position: "sticky",
				top: 0,
				zIndex: "sticky",
			}
		: {};

	return (
		<Box {...positionProps}>
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
