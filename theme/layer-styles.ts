import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
	backdrop: {
		description: "backdrop",
		value: {
			background: `radial-gradient(
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
        radial-gradient(closest-corner, {colors.primary.900} 0%, {colors.gray.900})`,
		},
	},
});
