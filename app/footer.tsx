import { Box, Button, Container, Flex } from "@chakra-ui/react";

export const Footer = () => {
	return (
		<Box as="footer" py={8} borderTop="1px solid" borderColor="neutral.500">
			<Container>
				<Flex align="center" gap={4}>
					<Button variant="ghost">Login</Button>
				</Flex>
			</Container>
		</Box>
	);
};
