"use client";

import { ChakraProvider } from "@chakra-ui/provider";
import type { PropsWithChildren } from "react";

export const AppProviders = ({ children }: PropsWithChildren) => {
	return <ChakraProvider>{children}</ChakraProvider>;
};
