import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";
import { colors } from "./colors";
import { animations, keyframes } from "./key-frames";
import { layerStyles } from "./layer-styles";
import { semanticTokens } from "./semantic-tokens";

const theme = defineConfig({
  theme: {
    keyframes,
    layerStyles,
    tokens: {
      colors,
      animations,
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
