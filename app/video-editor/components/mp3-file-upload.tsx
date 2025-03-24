import { Button, FileUpload, Icon, Text } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

export const Mp3FileUpload = () => {
	return (
		<FileUpload.Root
			minW="xl"
			alignItems="stretch"
			maxFiles={10}
			accept={"audio/mp3"}
		>
			<FileUpload.HiddenInput />
			<FileUpload.Dropzone>
				<Icon size="lg" color="fg.muted">
					<LuUpload />
				</Icon>
				<FileUpload.DropzoneContent gap={2}>
					<Text>Drag and drop your MP3 file here</Text>
					<Text color="fg.muted">
						Or click the button below to browse your files
					</Text>
					<Button mt={2}>Browse Files</Button>
				</FileUpload.DropzoneContent>
			</FileUpload.Dropzone>
			<FileUpload.List />
		</FileUpload.Root>
	);
};
