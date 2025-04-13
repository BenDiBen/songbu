"use client";

import {
	Button,
	FileUpload,
	Icon,
	Text,
	VStack,
	useSlider,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import type { Line } from "../types";
import { FRAMES } from "./frames";
import { LyricsTimeline } from "./lyrics-timeline";
import { Preview } from "./preview";

export const SyncLyrics = ({ max = 300 }: { max?: number }) => {
	const [value, setValue] = useState([50, 75]);
	const [isMouseOver, setIsMouseOver] = useState(false);
	const [isHoveringThumb, setIsHoveringThumb] = useState(false);
	const [mouseThumbPosition, setMouseThumbPosition] = useState(0);
	const showNewThumb = isMouseOver && !isHoveringThumb;
	const slider = useSlider({
		max,
		value: [mouseThumbPosition, ...value],
		step: 0.1,
		onValueChangeEnd: (e) => setValue(e.value),
	});
	const [file, setFile] = useState<File | null>(null);
	const [lines, setLines] = useState<Line[]>(
		FRAMES.flatMap((frame) => frame.lines),
	);

	return (
		<VStack>
			<Preview file={file} />
			<LyricsTimeline />
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
};
