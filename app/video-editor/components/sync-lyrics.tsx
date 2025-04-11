"use client";

import { Tooltip } from "@/components/ui/tooltip";
import {
	Box,
	Button,
	FileUpload,
	Icon,
	Slider,
	Text,
	VStack,
	useSlider,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { Preview } from "./preview";
import { StepControls } from "./step-controls";

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

	return (
		<VStack>
			<Preview file={file} />
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
			<StepControls />
			{value.join(",")}
			<Button onClick={() => setValue([70, 75])}>Add</Button>
			<Box
				onMouseEnter={() => setIsMouseOver(true)}
				onMouseLeave={() => setIsMouseOver(false)}
				onMouseMove={(e) => {
					if (!isMouseOver) {
						return;
					}

					const rect = e.currentTarget.getBoundingClientRect();
					const percent = (e.clientX - rect.left) / rect.width;

					setMouseThumbPosition(Math.max(Math.min(percent, 1), 0) * max);
				}}
			>
				<Tooltip content="+" portalled>
					<Slider.RootProvider
						// thumbAlignment="center"
						position="relative"
						minW="2xl"
						value={slider}
						// onValueChange={(e) => setValues(e.value)}
						py={4}
					>
						<Slider.Control>
							<Slider.Track />
							<Slider.Thumbs />
						</Slider.Control>
					</Slider.RootProvider>
				</Tooltip>
			</Box>
			<StepControls />
		</VStack>
	);

	function onFileAccepted({ files }: { files: File[] }) {
		console.log("LOADING FILE");
		setFile(files[0]);
	}
};
