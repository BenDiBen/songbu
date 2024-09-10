import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const appVariant = defineStyle({
	maxW: { base: "100%", lg: "container.2xl" },
	py: 8,
	px: { base: 4, sm: 8 },
});

const appThinVariant = defineStyle({
	...appVariant,
	maxW: { base: "100%", sm: "lg" },
});

export const Container = defineStyleConfig({
	variants: {
		app: appVariant,
		"app-thin": appThinVariant,
	},
});
