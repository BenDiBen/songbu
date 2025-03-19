import { defineLayerStyles } from "@chakra-ui/react";

const darkBackground = `radial-gradient(
          farthest-side at top left,
          {colors.primary.core} 0%,
          transparent 80%
        ),
        radial-gradient(
          farthest-corner circle at center right,
          {colors.secondary.core} 0%,
          {colors.secondary.halo} 40%,
          transparent 60%
        ),
        radial-gradient(closest-corner, {colors.primary.950} 0%, {colors.gray.950})`;

export const layerStyles = defineLayerStyles({
	backdrop: {
		description: "backdrop",
		value: {
			background: {
				_light: "{colors.primary.50}",
				_dark: darkBackground,
			},
		},
	},
});
