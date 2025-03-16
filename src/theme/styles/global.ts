import { defineStyle } from "@chakra-ui/react";

export const global = defineStyle({
	"&::-webkit-scrollbar": {
		display: "block",
		width: "16px",
	},
	"&::-webkit-scrollbar-track": {
		backgroundColor: "transparent",
		border: "none",
	},
	"&::-webkit-scrollbar-thumb": {
		borderRadius: "8px",
		border: "5px solid transparent",
		backgroundClip: "content-box",
		backgroundColor: "gray.300",
		opacity: "50%",
	},
});
