import { Container, Flex, Spacer } from "@chakra-ui/react";
import { Footer } from "../footer";
import { Header } from "../header";
import { VideoEditorProviders } from "./providers";

const VideoEditorLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Flex
			flexDir="column"
			justifyContent="stretch"
			minH="100svh"
			layerStyle="backdrop"
		>
			<Header />
			<Container display="flex" justifyContent="center" py={20}>
				<VideoEditorProviders>{children}</VideoEditorProviders>
			</Container>
			<Spacer />
			<Footer />
		</Flex>
	);
};

export default VideoEditorLayout;
