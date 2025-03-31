import {
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HeroImage } from "./hero-image";

export const HeroSection = () => {
	return (
		<Container>
			<Flex
				direction={{ base: "column", lg: "row" }}
				align="center"
				justify="space-between"
				gap={10}
			>
				<VStack align="flex-start" gap={4} maxW="600px">
					<Heading
						as="h1"
						size="3xl"
						fontWeight="bold"
						textShadow="text-glow.primary"
					>
						Karaoke with Personality
					</Heading>
					<Text fontSize="xl">
						Songbu helps you create professional karaoke videos from your
						backtrack with ease. No technical skills required.
					</Text>
					<Stack
						direction={{ base: "column", sm: "row" }}
						gap={4}
						w={{ base: "100%", sm: "auto" }}
					>
						<Button asChild size="lg" variant="solid" mt={6}>
							<NextLink href="/#coming-soon">Coming Soon!</NextLink>
						</Button>
					</Stack>
				</VStack>
				<HeroImage />
			</Flex>
		</Container>
	);
};
