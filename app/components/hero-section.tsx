import {
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export const HeroSection = () => {
	return (
		<Container>
			<Flex
				direction={{ base: "column", lg: "row" }}
				align="center"
				justify="space-between"
				gap={10}
			>
				<VStack align="flex-start" gap={6} maxW="600px">
					<Heading
						as="h1"
						size="3xl"
						fontWeight="bold"
						textShadow="text-glow.primary"
					>
						Turn Any Song Into Karaoke Magic
					</Heading>
					<Text fontSize="xl">
						Songbu helps karaoke DJs create professional karaoke videos from any
						MP3 in seconds. No technical skills required.
					</Text>
					<Stack
						direction={{ base: "column", sm: "row" }}
						gap={4}
						w={{ base: "100%", sm: "auto" }}
					>
						<Button asChild size="lg" variant="solid">
							<NextLink href="/video-editor">Get Started Free</NextLink>
						</Button>
						<Button size="lg" variant="outline">
							See How It Works
						</Button>
					</Stack>
				</VStack>
				<Image src="/hero.png" alt="Hero Image" width={800} height={800} />
			</Flex>
		</Container>
	);
};
