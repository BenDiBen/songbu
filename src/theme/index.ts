import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { components } from "./components";
import { layerStyles } from "./layer-styles";
import { sizes } from "./sizes";
import { global } from "./styles/global";

export const theme = extendTheme(
	{
		colors,
		components,
		config: {
			initialColorMode: "dark",
		},
		defaultProps: {
			colorScheme: "primary",
		},
		layerStyles,
		sizes,
		styles: {
			global,
		},
	},
	withDefaultColorScheme({ colorScheme: "brand" }),
);
