import { Box, Flex, Spacer } from "@chakra-ui/react";
import { FeaturesSection } from "./components/features-section";
import { HeroSection } from "./components/hero-section";
import { Footer } from "./footer";
import { Header } from "./header";

const background = {
	_light: "{colors.primary.50}",
	_dark: `radial-gradient(
		  farthest-side at top left,
		  #d453d0bf 0%,
		  #d453d010 80%
		),
		radial-gradient(
		  farthest-corner circle at center right,
		  #0cb1c470 0%,
		  #0cb1c430 40%,
		  transparent 60%
		),
		radial-gradient(closest-corner, {colors.primary.950} 0%, {colors.gray.950})`,
};

const HomePage = () => {
	return (
		<Flex flexDir="column" justifyContent="stretch" minH="100svh">
			<Box bg={background}>
				<Header />
				<HeroSection />
			</Box>
			<FeaturesSection />
			<Spacer />
			<Footer />
		</Flex>
	);
};

export default HomePage;
