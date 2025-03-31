import { Box } from "@chakra-ui/react";
import Image from "next/image";

export const HeroImage = () => {
	//TODO: Fix image warnings
	return (
		<>
			<Box display={{ _light: "block", _dark: "none" }}>
				<Image
					src="/hero-light.png"
					alt="Hero Image"
					width={800}
					height={800}
				/>
			</Box>
			<Box display={{ _light: "none", _dark: "block" }}>
				<Image src="/hero-dark.png" alt="Hero Image" width={800} height={800} />
			</Box>
		</>
	);
};
