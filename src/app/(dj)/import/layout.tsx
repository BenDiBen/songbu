"use client";

import { Container } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export const ImportLayout = ({ children }: PropsWithChildren) => {
	return (
		<Container
			variant="app"
			display="flex"
			alignItems="stretch"
			flexDirection="column"
		>
			{children}
		</Container>
	);
};

export default ImportLayout;
