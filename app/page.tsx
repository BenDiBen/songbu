import {
	Box,
	Button,
	Card,
	Center,
	Container,
	Flex,
	Heading,
	Icon,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { LuMic, LuUpload, LuVideo } from "react-icons/lu";
import { Header } from "./header";

const features = [
	{
		icon: LuUpload,
		title: "Simple Uploads",
		description:
			"Upload any MP3 file and let our AI do the heavy lifting to create your karaoke track.",
	},
	{
		icon: LuVideo,
		title: "Video Generation",
		description:
			"Create professional karaoke videos with synchronized lyrics and customizable backgrounds.",
	},
	{
		icon: LuMic,
		title: "DJ Ready",
		description:
			"Export in formats perfect for your karaoke setup, ready to use at your next gig.",
	},
];

const HomePage = () => {
	return (
		<Flex flexDir="column" justifyContent="stretch">
			<Header />
			<Container py={32}>
				<Flex
					direction={{ base: "column", md: "row" }}
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
							Songbu helps karaoke DJs create professional karaoke videos from
							any MP3 in seconds. No technical skills required.
						</Text>
						<Stack
							direction={{ base: "column", sm: "row" }}
							gap={4}
							w={{ base: "100%", sm: "auto" }}
						>
							<Button size="lg" variant="solid">
								Get Started Free
							</Button>
							<Button size="lg" variant="outline">
								See How It Works
							</Button>
						</Stack>
					</VStack>
				</Flex>
			</Container>
			<Box
				colorPalette="secondary"
				bg={{
					_light: "colorPalette.100",
					_dark: "colorPalette.halo",
				}}
				py={20}
			>
				<Container maxW="container.xl">
					<VStack gap={12}>
						<Heading
							textAlign="center"
							fontSize="4xl"
							textShadow="text-glow.secondary"
						>
							Powerful Karaoke Creation
						</Heading>
						<Flex w="100%" flexWrap="wrap" gap={8} justify="center">
							{features.map(({ title, description, icon: DisplayIcon }) => (
								<Card.Root key={title} width="320px" p={4}>
									<Card.Body gap={8} alignItems="center">
										<Card.Title>
											<Stack align="center">
												<Center
													bg={{
														_light: "colorPalette.200",
														_dark: "colorPalette.600",
													}}
													aspectRatio={1}
													p={2}
													borderRadius="full"
												>
													<Icon size="lg">
														<DisplayIcon />
													</Icon>
												</Center>
												{title}
											</Stack>
										</Card.Title>
										<Card.Description>{description}</Card.Description>
									</Card.Body>
								</Card.Root>
							))}
						</Flex>
					</VStack>
				</Container>
			</Box>
		</Flex>
	);
};

export default HomePage;
