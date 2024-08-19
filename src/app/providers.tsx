"use client";

import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export const AppProviders = ({ children }: PropsWithChildren) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
