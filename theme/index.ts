import {
	createSystem,
	defaultConfig,
	defineConfig,
	mergeConfigs,
} from "@chakra-ui/react";

const theme = defineConfig({
	theme: {
		breakpoints: {
			sm: "320px",
			md: "768px",
			lg: "960px",
			xl: "1200px",
		},
		tokens: {
			colors: {
				primary: {
					50: { value: "#f7edf7" },
					100: { value: "#edd9ed" },
					200: { value: "#e1b1df" },
					300: { value: "#d984d6" },
					400: { value: "#d453d0" },
					500: { value: "#c927c4" },
					600: { value: "#a1179d" },
					700: { value: "#740c71" },
					800: { value: "#430441" },
					900: { value: "#0c000c" },
					950: { value: "#0c000c" },
				},
				secondary: {
					50: { value: "#f2f9fa" },
					100: { value: "#d8f1f4" },
					200: { value: "#84dde8" },
					300: { value: "#31d4e8" },
					400: { value: "#0cb1c4" },
					500: { value: "#048190" },
					600: { value: "#015762" },
					700: { value: "#00363d" },
					800: { value: "#001e22" },
					900: { value: "#001113" },
					950: { value: "#001113" },
				},
				neutral: {
					50: { value: "#f4f2f5" },
					100: { value: "#e7e4e9" },
					200: { value: "#cbc5cf" },
					300: { value: "#afa7b6" },
					400: { value: "#948a9d" },
					500: { value: "#7a6c85" },
					600: { value: "#60526a" },
					700: { value: "#46394f" },
					800: { value: "#2c2234" },
					900: { value: "#130e17" },
					950: { value: "#130e17" },
				},
			},
		},
		semanticTokens: {
		  colors: {
			primary: {
				contrast: {
				  value: { _light: "white", _dark: "white" },
				},
				fg: {
				  value: { _light: "{colors.primary.700}", _dark: "{colors.primary.300}" },
				},
				subtle: {
				  value: { _light: "{colors.primary.100}", _dark: "{colors.primary.900}" },
				},
				muted: {
				  value: { _light: "{colors.primary.200}", _dark: "{colors.primary.800}" },
				},
				emphasized: {
				  value: { _light: "{colors.primary.300}", _dark: "{colors.primary.700}" },
				},
				solid: {
				  value: { _light: "{colors.primary.600}", _dark: "{colors.primary.600}" },
				},
				focusRing: {
				  value: { _light: "{colors.primary.600}", _dark: "{colors.primary.600}" },
				},
			},
			secondary: {
				contrast: {
				  value: { _light: "white", _dark: "white" },
				},
				fg: {
				  value: { _light: "{colors.secondary.700}", _dark: "{colors.secondary.300}" },
				},
				subtle: {
				  value: { _light: "{colors.secondary.100}", _dark: "{colors.secondary.900}" },
				},
				muted: {
				  value: { _light: "{colors.secondary.200}", _dark: "{colors.secondary.800}" },
				},
				emphasized: {
				  value: { _light: "{colors.secondary.300}", _dark: "{colors.secondary.700}" },
				},
				solid: {
				  value: { _light: "{colors.secondary.600}", _dark: "{colors.secondary.600}" },
				},
				focusRing: {
				  value: { _light: "{colors.secondary.600}", _dark: "{colors.secondary.600}" },
				},
			},
			neutral: {
			  contrast: {
				value: { _light: "{colors.white}", _dark: "{colors.black}" },
			  },
			  fg: {
				value: { _light: "{colors.neutral.800}", _dark: "{colors.neutral.200}" },
			  },
			  subtle: {
				value: { _light: "{colors.neutral.100}", _dark: "{colors.neutral.900}" },
			  },
			  muted: {
				value: { _light: "{colors.neutral.200}", _dark: "{colors.neutral.800}" },
			  },
			  emphasized: {
				value: { _light: "{colors.neutral.300}", _dark: "{colors.neutral.700}" },
			  },
			  solid: {
				value: { _light: "{colors.neutral.900}", _dark: "{colors.white}" },
			  },
			  focusRing: {
				value: { _light: "{colors.neutral.800}", _dark: "{colors.neutral.200}" },
			  },
			},
		  },
		},
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
