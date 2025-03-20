import { Box, Container, Text } from "@chakra-ui/react";

export const Footer = () => {
	return (
		<Box as="footer" py={8} borderTop="1px solid" borderColor="neutral.500">
			<Container display="flex" justifyContent="center">
				<Text fontSize="xs" color="neutral.fg">
					© 2025 Songbu. All rights reserved.
				</Text>
			</Container>
		</Box>
	);
};
