import {
	createSystem,
	defaultConfig,
	defineConfig,
	mergeConfigs,
} from "@chakra-ui/react";
import { colors } from "./colors";
import { layerStyles } from "./layer-styles";
import { semanticTokens } from "./semantic-tokens";

const theme = defineConfig({
	theme: {
		layerStyles,
		tokens: {
			colors,
		},
		semanticTokens,
	},
	strictTokens: true,
	globalCss: {
		html: {
			colorPalette: "primary",
		},
	},
});

const config = mergeConfigs(defaultConfig, theme);

export const system = createSystem(config);
