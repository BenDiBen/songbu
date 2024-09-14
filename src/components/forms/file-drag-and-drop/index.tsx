"use client";

import {
	Box,
	Center,
	Icon,
	Input,
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
import { useDrag } from "../../contexts/drag-provider";
import { EmptyPlaceholder } from "./empty-placeholder";
import { SinglePlaceholder } from "./single-placeholder";

interface FileDragAndDropProps {
	accept: Accept;
	invalid?: boolean;
	multiple?: boolean;
	onChange?: (files: File[]) => void;
	value?: File | File[];
}

export const FileDragAndDrop = forwardRef(
	(
		{
			invalid = false,
			value,
			accept,
			multiple = false,
			onChange,
		}: FileDragAndDropProps,
		ref,
	) => {
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
				<Input
					ref={(e) => {
						if (ref && typeof ref === "function") {
							ref(e);
						}

						inputRef.current = e;
					}}
					type="file"
					{...state?.getInputProps()}
					size="unset"
				/>
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
				<Box
					as="button"
					h="unset"
					aria-invalid={invalid}
					width="full"
					height="xs"
					onClick={handleClick}
					layerStyle="drop-area"
				>
					<Center h="full">
						{value && !Array.isArray(value) && (
							<SinglePlaceholder
								onRemove={onChange ? () => onChange([]) : undefined}
								file={value}
							/>
						)}
						{!value && <EmptyPlaceholder accept={accept} />}
					</Center>
				</Box>
			</>
		);
	},
);
