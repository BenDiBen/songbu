import { ColorModeButton } from "@/components/ui/color-mode";
import { Logo } from "@/components/ui/logo";
import { Button, Flex, Spacer } from "@chakra-ui/react";

export const Header = () => {
	return (
		<Flex align="center" gap={4}>
			<Logo
				p={4}
				height={32}
				color={{
					_light: "primary.500",
					_dark: "primary.contrast",
				}}
				viewBox="-2 -2 104 44"
			/>
			<Spacer />
			<Button variant="ghost">Login</Button>
			<ColorModeButton />
		</Flex>
	);
};
