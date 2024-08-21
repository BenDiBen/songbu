"use client";

import { useDrag } from "@/components/contexts/drag-provider";
import { Container } from "@chakra-ui/layout";
import type { PropsWithChildren } from "react";

export const ImportContainer = ({ children }: PropsWithChildren) => {
	const { state } = useDrag();
	return (
		<Container variant="app" {...state?.getRootProps()}>
			{children}
		</Container>
	);
};
