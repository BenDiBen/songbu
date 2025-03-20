import { Box, Flex, Spacer } from "@chakra-ui/react";
import { FeaturesSection } from "./components/features-section";
import { HeroSection } from "./components/hero-section";
import { Footer } from "./footer";
import { Header } from "./header";

const HomePage = () => {
	return (
		<Flex flexDir="column" justifyContent="stretch" minH="100svh">
			<Box layerStyle="backdrop">
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
