"use client";

import {
	Button,
	Icon,
	Input,
	type InputProps,
	Text,
	VStack,
} from "@chakra-ui/react";
import { type DragEvent, type SyntheticEvent, useRef } from "react";
import type { ChangeHandler, RefCallBack } from "react-hook-form";
import { LuFilePlus, LuFileSpreadsheet } from "react-icons/lu";

interface FileDragAndDropProps {
	inputProps: Omit<InputProps, "display" | "type" | "onChange"> & {
		ref?: RefCallBack;
		onChange: ChangeHandler;
	};
}

export const FileDragAndDrop = ({ inputProps }: FileDragAndDropProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = (event: SyntheticEvent) => {
		event.preventDefault();

		const element = inputRef.current;

		if (element) {
			element.click();
		}
	};

	const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const droppedFiles = event.dataTransfer.files;
		console.log({ droppedFiles });
		if (inputProps.onChange) {
			inputProps.onChange({ target: droppedFiles });
		}
	};

	const fileName = inputRef.current?.files?.[0]
		? inputRef.current.files[0].name
		: "";

	return (
		<>
			<Input
				{...inputProps}
				display="none"
				ref={(e) => {
					if (inputProps.ref) {
						inputProps.ref(e);
					}

					inputRef.current = e;
				}}
				type="file"
			/>
			<Button
				h="unset"
				p={0}
				border="2px dashed"
				variant="ghost"
				borderColor="chakra-subtle-text"
				onClick={handleClick}
				onDrop={handleDrop}
				onDragOver={(event) => event.preventDefault()}
			>
				<VStack px={16} py={8} gap={4}>
					<Icon as={fileName ? LuFileSpreadsheet : LuFilePlus} w={20} h={20} />
					<Text as="strong">
						{fileName ||
							"Drag a file here or click this area to browse for a file"}
					</Text>
					{inputProps.accept && (
						<Text fontSize="sm" color="chakra-subtle-text">
							{`Supports: ${inputProps.accept.toLocaleUpperCase()}`}
						</Text>
					)}
				</VStack>
			</Button>
		</>
	);
};
