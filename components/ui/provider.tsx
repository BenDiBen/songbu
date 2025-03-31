"use client";

import { system } from "@/theme/index";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export const Provider = (props: ColorModeProviderProps) => {
	return (
		<ChakraProvider value={system}>
			<ColorModeProvider defaultTheme="dark" {...props} />
		</ChakraProvider>
	);
};
