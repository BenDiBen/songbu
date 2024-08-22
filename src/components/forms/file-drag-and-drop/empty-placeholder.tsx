"use client";

import { Icon, Text, VStack } from "@chakra-ui/react";
import type { Accept } from "react-dropzone";
import { LuCheckCircle, LuFilePlus } from "react-icons/lu";

interface EmptyPlaceholderProps {
	accept: Accept;
}

export const EmptyPlaceholder = ({ accept }: EmptyPlaceholderProps) => {
	return (
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
	);
};
