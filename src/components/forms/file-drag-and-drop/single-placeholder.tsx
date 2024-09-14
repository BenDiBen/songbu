"use client";

import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import type { MouseEvent } from "react";
import { LuCheck, LuFileSpreadsheet } from "react-icons/lu";

interface SinglePlaceholderProps {
	file: File;
	onRemove?: () => void;
}

export const SinglePlaceholder = ({
	file,
	onRemove,
}: SinglePlaceholderProps) => {
	const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (onRemove) {
			onRemove();
		}
	};

	return (
		<VStack gap={4}>
			<Box>
				<Box
					borderRadius="full"
					bgColor="green.500"
					top={0}
					right={0}
					w={20}
					h={20}
					p={1}
				>
					<Icon as={LuCheck} w="full" h="full" />
				</Box>
			</Box>
			<HStack>
				<Icon as={LuFileSpreadsheet} />
				<Text as="strong">{file.name}</Text>
			</HStack>
			{onRemove && (
				<Button variant="outline" colorScheme="gray" onClick={handleRemove}>
					Remove
				</Button>
			)}
		</VStack>
	);
};
