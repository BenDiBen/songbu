import { defineStyle } from "@chakra-ui/react";
import { colors } from "./colors";

const backdrop = defineStyle({
	background: `radial-gradient(
      farthest-side at top left,
      ${colors.brand[400]}35 0%,
      transparent 80%
    ),
    radial-gradient(
      farthest-corner circle at center right,
      ${colors.accent[400]}40 0%,
      ${colors.accent[400]}10 40%,
      transparent 60%
    ),
    radial-gradient(closest-corner, ${colors.brand[900]} 0%, ${colors.gray[900]})`,
});

const dropArea = defineStyle({
	background: "chakra-body-bg",
	border: "2px dashed",
	borderRadius: "lg",
	borderColor: "chakra-border-color",
	textAlign: "center",
	_hover: {
		borderColor: "chakra-subtle-text",
		shadow: "0px 0px 50px -20px var(--chakra-colors-brand-300)",
	},
});

//--chakra-colors-twitter-500

export const layerStyles = { backdrop, "drop-area": dropArea };
