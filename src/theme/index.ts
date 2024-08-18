import {
	theme as baseTheme,
	extendTheme,
	withDefaultColorScheme,
} from "@chakra-ui/react";

export const theme = extendTheme(
	{
		colors: {
			primary: { ...baseTheme.colors.green },
		},
		defaultProps: {
			colorScheme: "primary",
		},
	},
	withDefaultColorScheme({ colorScheme: "primary" }),
);
