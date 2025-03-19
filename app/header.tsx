import { ColorModeButton } from "@/components/ui/color-mode";
import { Logo } from "@/components/ui/logo";
import { Button, Container, Flex, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export const Header = () => {
	return (
		<Container>
			<Flex as="nav" align="center" gap={4}>
				<Link asChild>
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
				<Button variant="ghost">Login</Button>
				<ColorModeButton />
			</Flex>
		</Container>
	);
};
