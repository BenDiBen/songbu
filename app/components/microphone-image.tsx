import MicrophoneDark from "@/public/images/microphone-dark.png";
import MicrophoneLight from "@/public/images/microphone-light.png";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

const images = [
	{
		key: "light",
		src: MicrophoneLight,
		display: { _light: "block", _dark: "none" },
	},
	{
		key: "dark",
		src: MicrophoneDark,
		display: { _light: "none", _dark: "block" },
	},
];

export const MicrophoneImage = () => {
	return (
		<>
			{images.map(({ key, src, display }) => (
				<Box
					key={key}
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
