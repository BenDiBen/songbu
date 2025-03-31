import { Stack, Steps } from "@chakra-ui/react";
import { EditingSteps } from "./components/editing-steps";
import { Mp3FileUpload } from "./components/mp3-file-upload";
import { SyncLyrics } from "./components/sync-lyrics";
import { UploadLyrics } from "./components/upload-lyrics";

const VideoEditorPage = () => {
	return (
		<Stack align="center" gap={12}>
			<EditingSteps />
			<Steps.Content index={0}>
				<Mp3FileUpload />
			</Steps.Content>
			<Steps.Content index={1}>
				<UploadLyrics />
			</Steps.Content>
			<Steps.Content index={2}>
				<SyncLyrics />
			</Steps.Content>
		</Stack>
	);
};

export default VideoEditorPage;
