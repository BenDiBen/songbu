import { Stack } from "@chakra-ui/react";
import { Mp3FileUpload } from "./components/mp3-file-upload";
import { EditingSteps } from "./components/editing-steps";

const VideoEditorPage = () => {
	return (
		<Stack align="center">
			<EditingSteps />
			<Mp3FileUpload />
		</Stack>
	);
};

export default VideoEditorPage;
