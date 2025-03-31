import { Box } from "@chakra-ui/react";
import Image from "next/image";

const images = [
	{ src: "/microphone-light.png", display: { _light: "block", _dark: "none" } },
	{ src: "/microphone-dark.png", display: { _light: "none", _dark: "block" } },
];

export const MicrophoneImage = () => {
	return (
		<>
			{images.map(({ src, display }) => (
				<Box
					key={src}
					height={{ base: "unset", sm: "md" }}
					width={{ base: "full", sm: "unset" }}
					display={display}
					aspectRatio="1"
					position="relative"
				>
					<Image
						src={src}
						alt="Hero Image"
						fill
						object-fit="contain"
						sizes="(max-width: 800px) 800px, 400px"
					/>
				</Box>
			))}
		</>
	);
};
