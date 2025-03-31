import HeroDark from "@/public/images/hero-dark.png";
import HeroLight from "@/public/images/hero-light.png";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

export const HeroImage = () => {
	return (
		<>
			<Box display={{ _light: "block", _dark: "none" }}>
				<Image src={HeroLight} alt="Hero Image" width={800} height={800} />
			</Box>
			<Box display={{ _light: "none", _dark: "block" }}>
				<Image src={HeroDark} alt="Hero Image" width={800} height={800} />
			</Box>
		</>
	);
};
