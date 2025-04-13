"use client";

import { useLocalState } from "@/app/hooks/use-local-state";
import { withoutSsr } from "@/lib/utils";
import { Button, FileUpload, Icon, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { useDebounce } from "use-debounce";
import { FRAMES } from "./frames";
import { LyricsTimeline } from "./lyrics-timeline";
import { Preview } from "./preview";

export const SyncLyrics = withoutSsr(() => {
	const [file, setFile] = useState<File | null>(null);
	const [frames, setFrames] = useLocalState("frames", FRAMES);
	const [debouncedFrames] = useDebounce(frames, 200);

	return (
		<VStack>
			<Preview frames={debouncedFrames} file={file} />
			<LyricsTimeline frames={frames} onUpdate={setFrames} />
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
		</VStack>
	);

	function onFileAccepted({ files }: { files: File[] }) {
		setFile(files[0]);
	}
});
