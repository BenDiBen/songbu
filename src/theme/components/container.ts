import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const appVariant = defineStyle({
	maxW: { base: "100%", lg: "container.2xl" },
	py: 8,
	px: { base: 4, sm: 8 },
});

export const Container = defineStyleConfig({
	variants: {
		app: appVariant,
	},
});
