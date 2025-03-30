import {
	Box,
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
import {
	LuArrowLeftRight,
	LuDownload,
	LuPalette,
	LuVideo,
} from "react-icons/lu";

const features = [
	{
		icon: LuArrowLeftRight,
		title: "Lyric Matching",
		description:
			"Add lyrics and use our intuitive editor to match them perfectly to your music.",
	},
	{
		icon: LuPalette,
		title: "Custom Branding",
		description:
			"Add your own logo, colors, and style to make videos that are uniquely yours.",
	},
	{
		icon: LuVideo,
		title: "Visualizations",
		description:
			"Choose from a variety of audio visualizations to enhance your videos.",
	},
	{
		icon: LuDownload,
		title: "Easy Export",
		description:
			"Export your finished karaoke to MP4 or MP3+G videos in high quality, ready to share or perform.",
	},
];

export const FeaturesSection = () => {
	return (
		<Box colorPalette="secondary" py={20}>
			<Container>
				<VStack gap={12}>
					<VStack gap={4}>
						<Heading
							textAlign="center"
							fontSize="4xl"
							textShadow="text-glow.secondary"
						>
							Everything You Need
						</Heading>
						<Text color="fg.muted" textAlign="center" fontSize="lg">
							Songbu provides all the tools you need to create professional
							karaoke videos with perfect timing and custom branding.
						</Text>
					</VStack>
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
												shadow={{
													_light: undefined,
													_dark: "0 0 20px {colors.secondary.600}",
												}}
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
