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

export const FeaturesSection = () => {
	return (
		<Box
			colorPalette={{
				_light: "gray",
				_dark: "secondary",
			}}
			bg={{
				_light: "colorPalette.100",
				_dark: "colorPalette.halo",
			}}
			py={20}
		>
			<Container>
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
							<Card.Root key={title} width="xs" p={4}>
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
	);
};
