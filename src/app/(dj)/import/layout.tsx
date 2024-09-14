"use client";

import { useDrag } from "@/components/contexts/drag-provider";
import { Container } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export const ImportLayout = ({ children }: PropsWithChildren) => {
	const { state } = useDrag();
	return (
		<Container
			variant="app"
			display="flex"
			alignItems="stretch"
			flexDirection="column"
			{...state}
		>
			{children}
		</Container>
	);
};

export default ImportLayout;
