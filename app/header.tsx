import { Logo } from "@/components/ui/logo";
import { Flex } from "@chakra-ui/react";

export const Header = () => {
	return (
		<Flex>
			<Logo p={4} height={40} color="white" viewBox="-2 -2 104 44" />
		</Flex>
	);
};
