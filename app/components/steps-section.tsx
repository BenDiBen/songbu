import {
	Badge,
	Box,
	Container,
	Flex,
	HStack,
	Heading,
	StackSeparator,
	Text,
	VStack,
} from "@chakra-ui/react";
import { MicrophoneImage } from "./microphone-image";

const features = [
	{
		title: "Upload",
		description:
			"Upload your backtrack without vocals and add your lyrics text.",
	},
	{
		title: "Sync",
		description: "Use our intuitive editor to match lyrics to your music.",
	},
	{
		title: "Customize & Export",
		description:
			"Add your branding, choose visualizations, and export your karaoke video.",
	},
];

export const StepsSection = () => {
	return (
		<Box pt={20} layerStyle="backdrop" id="steps">
			<Container>
				<VStack gap={12} align="stretch">
					<VStack gap={4}>
						<Heading
							as="h2"
							textAlign="center"
							fontWeight="bold"
							size="3xl"
							textShadow="text-glow.secondary"
						>
							Simple 3-Step Process
						</Heading>
						<Text color="fg.muted" textAlign="center" fontSize="lg">
							Creating professional karaoke videos has never been easier with
							our streamlined workflow.
						</Text>
					</VStack>
					<Flex
						flexWrap="wrap"
						gapX={32}
						gapY={8}
						justify="center"
						direction="row-reverse"
					>
						<VStack
							mb={20}
							align="flex-start"
							gap={8}
							separator={<StackSeparator />}
						>
							{features.map(({ title, description }, index) => (
								<VStack key={title} align="flex-start" maxW="sm">
									<HStack gap={4}>
										<Badge borderRadius="full" size="lg" variant="solid">
											{index + 1}
										</Badge>
										<Heading
											as="h3"
											textAlign="center"
											size="2xl"
											textShadow="text-glow.secondary"
										>
											{title}
										</Heading>
									</HStack>
									<Text color="fg.muted">{description}</Text>
								</VStack>
							))}
						</VStack>
						<MicrophoneImage />
					</Flex>
				</VStack>
			</Container>
		</Box>
	);
};
