import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { CountDown } from "./count-down";

export const ComingSoonSection = () => {
	return (
		<Box colorPalette="secondary" py={20} id="coming-soon">
			<Container>
				<VStack gap={12}>
					<VStack gap={4}>
						<Heading
							as="h2"
							textAlign="center"
							fontWeight="bold"
							size="3xl"
							textShadow="text-glow.secondary"
						>
							Coming Soon!
						</Heading>
						<Text color="fg.muted" textAlign="center" fontSize="lg">
							Songbu is launching soon! Check in after launch to give it a spin.
						</Text>
						<CountDown />
					</VStack>
				</VStack>
			</Container>
		</Box>
	);
};
