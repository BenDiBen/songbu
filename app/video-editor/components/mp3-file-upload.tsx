"use client";

import { Button, FileUpload, Icon, Text } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { useEditingSteps, useVideoContext } from "../providers";

export const Mp3FileUpload = () => {
	const { setBacktrack } = useVideoContext();
	const { goToNextStep } = useEditingSteps();

	return (
		<FileUpload.Root
			minW="xl"
			alignItems="stretch"
			maxFiles={10}
			accept={"audio/*"}
			onFileAccept={onFileAccepted}
		>
			<FileUpload.HiddenInput />
			<FileUpload.Dropzone>
				<Icon size="lg" color="fg.muted">
					<LuUpload />
				</Icon>
				<FileUpload.DropzoneContent gap={2}>
					<Text>Drag and drop your backtrack here</Text>
					<Text color="fg.muted">
						Or click the button below to browse your files
					</Text>
					<Button mt={2}>Browse Files</Button>
				</FileUpload.DropzoneContent>
			</FileUpload.Dropzone>
			<FileUpload.List />
		</FileUpload.Root>
	);

	function onFileAccepted({ files }: { files: File[] }) {
		const fileName = files[0]?.name;
		setBacktrack(fileName);

		if (fileName) {
			goToNextStep();
		}
	}
};
