import { defineLayerStyles } from "@chakra-ui/react";

const background = {
	_light: "{colors.primary.50}",
	_dark: `radial-gradient(
          farthest-side at top left,
          #d453d035 0%,
          #d453d010 80%
        ),
        radial-gradient(
          farthest-corner circle at center right,
          #0cb1c440 0%,
          #0cb1c410 40%,
          transparent 60%
        ),
        radial-gradient(closest-corner, {colors.primary.950} 0%, {colors.gray.950})`,
};

export const layerStyles = defineLayerStyles({
	backdrop: {
		description: "backdrop",
		value: {
			background,
		},
	},
});
