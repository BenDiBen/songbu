"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Icon,
	Image,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	LuMic as Mic,
	LuMusic as Music,
	LuUpload as Upload,
	LuVideo as Video,
} from "react-icons/lu";

// Feature component
const Feature = ({
	title,
	text,
	icon,
}: { title: string; text: string; icon: React.ReactNode }) => {
	return (
		<Stack
			align="center"
			p={6}
			borderRadius="lg"
			border="1px solid"
			borderColor="neutral.500"
			_hover={{
				boxShadow: "0 0 15px #7a6c85",
				transform: "translateY(-5px)",
			}}
			transition="all 0.3s ease"
		>
			<Flex
				w={16}
				h={16}
				align="center"
				justify="center"
				color="white"
				rounded="full"
				mb={4}
			>
				<Icon color="primary.500">{icon}</Icon>
			</Flex>
			<Heading fontSize="xl" color="white">
				{title}
			</Heading>
			<Text textAlign="center">{text}</Text>
		</Stack>
	);
};

export default function Home() {
	return (
		<Box bgSize="cover" position="center" minH="100vh">
			{/* Navigation */}
			<Box
				as="nav"
				py={4}
				px={8}
				borderBottom="1px solid"
				borderColor="neutral.900"
			>
				<Flex
					justify="space-between"
					align="center"
					maxW="container.xl"
					mx="auto"
				>
					<Heading fontSize="2xl" fontWeight="bold" color="brand.500">
						BOOO
					</Heading>
					<Flex gap={4}>
						<Button variant="ghost">Features</Button>
						<Button variant="ghost">How It Works</Button>
						<Button variant="ghost">Pricing</Button>
						<Button variant="outline">Login</Button>
						<ColorModeButton />
					</Flex>
				</Flex>
			</Box>

			{/* Hero Section */}
			<Container maxW="container.xl" py={20}>
				<Flex
					direction={{ base: "column", md: "row" }}
					align="center"
					justify="space-between"
					gap={10}
				>
					<VStack align="flex-start" gap={6} maxW="600px">
						<Heading as="h1" size="3xl" fontWeight="bold" lineHeight="shorter">
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
							<Button variant="solid">
								<Upload size={24} />
								Solid
							</Button>
							<Button variant="solid" disabled>
								Disabled
							</Button>
							<Button variant="subtle">Subtle</Button>
							<Button variant="surface">Surface</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="plain">Plain</Button>
						</Stack>
					</VStack>
					<Box
						position="relative"
						w={{ base: "100%", md: "500px" }}
						h={{ base: "300px", md: "400px" }}
						borderRadius="lg"
						overflow="hidden"
					>
						<Image
							src="/placeholder.svg?height=400&width=500"
							alt="Karaoke app interface"
							objectFit="cover"
							w="100%"
							h="100%"
						/>
					</Box>
				</Flex>
			</Container>

			{/* Hero Section Red*/}
			<Container colorPalette="gray" maxW="container.xl" py={20}>
				<Flex
					direction={{ base: "column", md: "row" }}
					align="center"
					justify="space-between"
					gap={10}
				>
					<VStack align="flex-start" gap={6} maxW="600px">
						<Heading as="h1" size="3xl" fontWeight="bold" lineHeight="shorter">
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
							<Button variant="solid">
								<Upload size={24} />
								Solid
							</Button>
							<Button variant="solid" disabled>
								Disabled
							</Button>
							<Button variant="subtle">Subtle</Button>
							<Button variant="surface">Surface</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="plain">Plain</Button>
						</Stack>
					</VStack>
					<Box
						position="relative"
						w={{ base: "100%", md: "500px" }}
						h={{ base: "300px", md: "400px" }}
						borderRadius="lg"
						overflow="hidden"
					>
						<Image
							src="/placeholder.svg?height=400&width=500"
							alt="Karaoke app interface"
							objectFit="cover"
							w="100%"
							h="100%"
						/>
					</Box>
				</Flex>
			</Container>

			{/* Features Section */}
			<Box py={20}>
				<Container maxW="container.xl">
					<VStack gap={12}>
						<Heading textAlign="center" fontSize="4xl">
							Powerful Karaoke Creation
						</Heading>
						<Flex w="100%" flexWrap="wrap" gap={8} justify="center">
							<Feature
								icon={<Upload size={24} />}
								title="Simple Uploads"
								text="Upload any MP3 file and let our AI do the heavy lifting to create your karaoke track."
							/>
							<Feature
								icon={<Music size={24} />}
								title="Vocal Removal"
								text="Advanced technology that removes vocals while preserving the instrumental quality."
							/>
							<Feature
								icon={<Video size={24} />}
								title="Video Generation"
								text="Create professional karaoke videos with synchronized lyrics and customizable backgrounds."
							/>
							<Feature
								icon={<Mic size={24} />}
								title="DJ Ready"
								text="Export in formats perfect for your karaoke setup, ready to use at your next gig."
							/>
						</Flex>
					</VStack>
				</Container>
			</Box>

			{/* How It Works */}
			<Box py={20}>
				<Container maxW="container.xl">
					<VStack gap={16}>
						<Heading textAlign="center" fontSize="4xl">
							Three Simple Steps
						</Heading>
						<Flex
							direction={{ base: "column", lg: "row" }}
							w="100%"
							justify="space-between"
							align="center"
							gap={10}
						>
							<VStack
								gap={4}
								p={6}
								borderRadius="lg"
								border="1px solid"
								borderColor="neutral.500"
								flex="1"
								boxShadow="0 0 10px #7a6c85"
								position="relative"
								_after={{
									content: '"1"',
									position: "absolute",
									top: "-20px",
									left: "50%",
									transform: "translateX(-50%)",
									bg: "brand.500",
									color: "white",
									w: "40px",
									h: "40px",
									borderRadius: "full",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontWeight: "bold",
									boxShadow: "0 0 10px #c927c4",
								}}
							>
								<Heading fontSize="xl" color="white">
									Upload Your MP3
								</Heading>
								<Text color="gray.300" textAlign="center">
									Drag and drop your song file into our uploader. We support all
									popular audio formats.
								</Text>
							</VStack>
							<VStack
								gap={4}
								p={6}
								bg="rgba(0,0,0,0.7)"
								borderRadius="lg"
								border="1px solid"
								borderColor="neutral.500"
								flex="1"
								boxShadow="0 0 10px #7a6c85"
								position="relative"
								_after={{
									content: '"2"',
									position: "absolute",
									top: "-20px",
									left: "50%",
									transform: "translateX(-50%)",
									bg: "brand.500",
									color: "white",
									w: "40px",
									h: "40px",
									borderRadius: "full",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontWeight: "bold",
									boxShadow: "0 0 10px #c927c4",
								}}
							>
								<Heading fontSize="xl" color="white">
									Customize Your Video
								</Heading>
								<Text color="gray.300" textAlign="center">
									Add lyrics, choose from neon-themed backgrounds, and set
									timing for your karaoke video.
								</Text>
							</VStack>
							<VStack
								gap={4}
								p={6}
								bg="rgba(0,0,0,0.7)"
								borderRadius="lg"
								border="1px solid"
								borderColor="neutral.500"
								flex="1"
								boxShadow="0 0 10px #7a6c85"
								position="relative"
								_after={{
									content: '"3"',
									position: "absolute",
									top: "-20px",
									left: "50%",
									transform: "translateX(-50%)",
									bg: "brand.500",
									color: "white",
									w: "40px",
									h: "40px",
									borderRadius: "full",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontWeight: "bold",
									boxShadow: "0 0 10px #c927c4",
								}}
							>
								<Heading fontSize="xl" color="white">
									Download & Perform
								</Heading>
								<Text color="gray.300" textAlign="center">
									Export your karaoke video in high quality, ready to use at
									your next DJ gig.
								</Text>
							</VStack>
						</Flex>
					</VStack>
				</Container>
			</Box>

			{/* CTA Section */}
			<Box py={20} bg="black">
				<Container maxW="container.md">
					<VStack
						gap={8}
						p={10}
						borderRadius="xl"
						bg="rgba(4, 129, 144, 0.1)"
						border="1px solid"
						borderColor="accent.500"
						boxShadow="0 0 30px rgba(4, 129, 144, 0.3)"
					>
						<Heading
							textAlign="center"
							fontSize="3xl"
							color="white"
							textShadow="0 0 10px #048190, 0 0 20px #048190"
						>
							Ready to Transform Your Karaoke Experience?
						</Heading>
						<Text fontSize="lg" color="gray.300" textAlign="center">
							Join hundreds of DJs who are creating professional karaoke videos
							with Songbu. Start for free today.
						</Text>
						<Button
							size="lg"
							variant="solid"
							px={10}
							py={7}
							fontSize="xl"
							bg="brand.500"
							color="white"
							boxShadow="0 0 15px #c927c4"
							_hover={{ boxShadow: "0 0 30px #c927c4" }}
						>
							Get Started Free — No Credit Card
						</Button>
						<Text fontSize="sm" color="gray.400">
							Free plan includes 5 karaoke video creations per month
						</Text>
					</VStack>
				</Container>
			</Box>

			{/* Footer */}
			<Box as="footer" py={10} borderTop="1px solid" borderColor="neutral.500">
				<Container maxW="container.xl">
					<Flex
						direction={{ base: "column", md: "row" }}
						justify="space-between"
						align={{ base: "center", md: "flex-start" }}
						gap={8}
					>
						<VStack align={{ base: "center", md: "flex-start" }} gap={4}>
							<Heading
								fontSize="2xl"
								fontWeight="bold"
								color="brand.500"
								textShadow="0 0 10px #c927c4, 0 0 20px #c927c4"
							>
								SONGBU
							</Heading>
							<Text color="gray.400">
								The ultimate karaoke creation tool for DJs
							</Text>
						</VStack>
						<Flex
							gap={10}
							direction={{ base: "column", sm: "row" }}
							align={{ base: "center", sm: "flex-start" }}
						>
							<VStack align="flex-start" gap={2}>
								<Text fontWeight="bold" color="accent.500">
									Product
								</Text>
								<Text color="gray.400">Features</Text>
								<Text color="gray.400">Pricing</Text>
								<Text color="gray.400">Tutorials</Text>
							</VStack>
							<VStack align="flex-start" gap={2}>
								<Text fontWeight="bold" color="accent.500">
									Company
								</Text>
								<Text color="gray.400">About</Text>
								<Text color="gray.400">Blog</Text>
								<Text color="gray.400">Careers</Text>
							</VStack>
							<VStack align="flex-start" gap={2}>
								<Text fontWeight="bold" color="accent.500">
									Support
								</Text>
								<Text color="gray.400">Help Center</Text>
								<Text color="gray.400">Contact Us</Text>
								<Text color="gray.400">Privacy Policy</Text>
							</VStack>
						</Flex>
					</Flex>
					<Text color="gray.500" textAlign="center" mt={10}>
						© {new Date().getFullYear()} Songbu. All rights reserved.
					</Text>
				</Container>
			</Box>
		</Box>
	);
}
