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
import { type SyntheticEvent, useCallback, useEffect, useRef } from "react";
import type { Accept, FileRejection } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import { LuFilePlus } from "react-icons/lu";
import { useDrag } from "../contexts/drag-provider";

interface FileDragAndDropProps {
	name: string;
	accept: Accept;
}

export const FileDragAndDrop = ({ name, accept }: FileDragAndDropProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { setValue } = useFormContext();
	const bgColor = useColorModeValue("primary.200", "primary.800");
	const onDrop = useCallback(
		(droppedFiles: File[], rejectedFiles: FileRejection[]) => {
			console.log({ droppedFiles });
			if (setValue) {
				setValue(name, droppedFiles);
			}
		},
		[name, setValue],
	);
	const { setOptions, state } = useDrag();

	useEffect(() => {
		setOptions({ accept, onDrop });
	}, [accept, setOptions, onDrop]);

	const handleClick = (event: SyntheticEvent) => {
		event.preventDefault();

		const element = inputRef.current;

		if (element) {
			element.click();
		}
	};
	return (
		<>
			<Center
				display={state?.isDragActive ? "flex" : "none"}
				position="absolute"
				height="100svh"
				width="full"
				top={0}
				left={0}
				bgColor={bgColor}
				zIndex="overlay"
				onClick={state?.getRootProps().onClick}
			>
				<VStack gap={4}>
					<Icon as={LuFilePlus} w={20} h={20} />
					<Text as="strong">Drop your files here</Text>
					{accept && (
						<Text fontSize="sm" color="chakra-subtle-text">
							{`Supports: ${Object.keys(accept).join(", ")}`}
						</Text>
					)}
				</VStack>
			</Center>
			<Controller
				name={name}
				render={({ field: { ref } }) => (
					<Card
						h="unset"
						py={8}
						border="2px dashed"
						borderColor="chakra-subtle-text"
						width="lg"
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
										{`Supports: ${Object.keys(accept).join(", ")}`}
									</Text>
								)}
							</VStack>
						</CardBody>
					</Card>
				)}
			/>
		</>
	);
};
