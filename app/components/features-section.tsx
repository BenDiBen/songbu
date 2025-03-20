import {
	Box,
	Card,
	Center,
	Container,
	Flex,
	Heading,
	Icon,
	Stack,
	VStack,
} from "@chakra-ui/react";
import { LuMic, LuUpload, LuVideo } from "react-icons/lu";

const features = [
	{
		icon: LuUpload,
		title: "Simple Uploads",
		description:
			"Upload any MP3 file or load a backtrack directly from YouTube.",
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

export const FeaturesSection = () => {
	return (
		<Box colorPalette="secondary" py={20}>
			<Container>
				<VStack gap={12}>
					<Heading
						textAlign="center"
						fontSize="4xl"
						textShadow="text-glow.secondary"
					>
						Powerful Karaoke Creation
					</Heading>
					<Flex flexWrap="wrap" gap={8} justify="center">
						{features.map(({ title, description, icon: DisplayIcon }) => (
							<Card.Root
								key={title}
								variant="outline"
								width="xs"
								p={4}
								borderRadius="3xl"
								textAlign="center"
							>
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
												shadow="0 0 20px {colors.secondary.600}"
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
	);
};
