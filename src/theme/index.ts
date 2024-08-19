import {
	theme as baseTheme,
	extendTheme,
	withDefaultColorScheme,
} from "@chakra-ui/react";
import { components } from "./components";
import { sizes } from "./sizes";

export const theme = extendTheme(
	{
		colors: {
			primary: { ...baseTheme.colors.green },
		},
		components,
		config: {
			initialColorMode: "dark",
		},
		defaultProps: {
			colorScheme: "primary",
		},
		sizes,
	},
	withDefaultColorScheme({ colorScheme: "primary" }),
);
