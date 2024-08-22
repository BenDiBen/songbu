"use client";

import {
	Box,
	Card,
	CardBody,
	Center,
	Icon,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import {
	type SyntheticEvent,
	forwardRef,
	useCallback,
	useEffect,
	useRef,
} from "react";
import type { Accept, FileRejection } from "react-dropzone";
import { LuFilePlus } from "react-icons/lu";
import { useDrag } from "../contexts/drag-provider";

interface FileDragAndDropProps {
	name: string;
	accept: Accept;
	multiple?: boolean;
	onChange?: (files: File[]) => void;
}

export const FileDragAndDrop = forwardRef(
	({ name, accept, multiple = false, onChange }: FileDragAndDropProps, ref) => {
		const inputRef = useRef<HTMLInputElement | null>(null);
		const bgColor = useColorModeValue("primary.200", "primary.800");
		const onDrop = useCallback(
			(droppedFiles: File[], rejectedFiles: FileRejection[]) => {
				if (onChange) {
					onChange(droppedFiles);
				}
			},
			[onChange],
		);
		const { setOptions, state } = useDrag();

		useEffect(() => {
			setOptions({ accept, onDrop, multiple });
		}, [accept, setOptions, onDrop, multiple]);

		const handleClick = (event: SyntheticEvent) => {
			event.preventDefault();

			state?.open();
		};

		return (
			<>
				<Center
					display={state?.isDragActive ? "flex" : "none"}
					position="absolute"
					height="full"
					width="full"
					top={0}
					left={0}
					bgColor={bgColor}
					zIndex="overlay"
					onClick={state?.getRootProps().onClick}
				>
					<VStack gap={4}>
						<Icon as={LuFilePlus} w={20} h={20} />
						<Text as="strong">{`Drop your ${multiple ? "files" : "file"} here`}</Text>
						{accept && (
							<Text fontSize="sm" color="chakra-subtle-text">
								{`Supports: ${Object.keys(accept).join(", ")}`}
							</Text>
						)}
					</VStack>
				</Center>
				<Card
					h="unset"
					py={8}
					border="2px dashed"
					borderColor="chakra-subtle-text"
					width="full"
					textAlign="center"
					onClick={handleClick}
					_hover={{
						bgColor,
					}}
				>
					<CardBody>
						<Box display="none">
							<input
								ref={(e) => {
									if (ref) {
										ref(e);
									}

									inputRef.current = e;
								}}
								type="file"
								{...state?.getInputProps()}
							/>
						</Box>
						<VStack gap={4}>
							<Icon as={LuFilePlus} w={20} h={20} />
							<Text as="strong">
								Drag a file here or click this area to browse for a file
							</Text>
							{accept && (
								<Text fontSize="sm" color="chakra-subtle-text">
									{`Supports: ${Object.values(accept).flat().join(", ")}`}
								</Text>
							)}
						</VStack>
					</CardBody>
				</Card>
			</>
		);
	},
);
