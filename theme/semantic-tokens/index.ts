import { shadows } from "./shadows";

export const semanticTokens = {
	colors: {
		primary: {
			contrast: {
				value: { _light: "white", _dark: "white" },
			},
			bg: {
				value: {
					_light: "{colors.secondary.50}",
					_dark: "{colors.secondary.950}",
				},
			},
			fg: {
				value: {
					_light: "{colors.primary.700}",
					_dark: "{colors.primary.300}",
				},
			},
			subtle: {
				value: {
					_light: "{colors.primary.100}",
					_dark: "{colors.primary.900}",
				},
			},
			muted: {
				value: {
					_light: "{colors.primary.200}",
					_dark: "{colors.primary.800}",
				},
			},
			emphasized: {
				value: {
					_light: "{colors.primary.300}",
					_dark: "{colors.primary.700}",
				},
			},
			solid: {
				value: {
					_light: "{colors.primary.600}",
					_dark: "{colors.primary.600}",
				},
			},
			focusRing: {
				value: {
					_light: "{colors.primary.600}",
					_dark: "{colors.primary.600}",
				},
			},
		},
		secondary: {
			contrast: {
				value: { _light: "white", _dark: "white" },
			},
			bg: {
				value: {
					_light: "{colors.secondary.50}",
					_dark: "{colors.secondary.950}",
				},
			},
			fg: {
				value: {
					_light: "{colors.secondary.700}",
					_dark: "{colors.secondary.300}",
				},
			},
			subtle: {
				value: {
					_light: "{colors.secondary.100}",
					_dark: "{colors.secondary.900}",
				},
			},
			muted: {
				value: {
					_light: "{colors.secondary.200}",
					_dark: "{colors.secondary.800}",
				},
			},
			emphasized: {
				value: {
					_light: "{colors.secondary.300}",
					_dark: "{colors.secondary.700}",
				},
			},
			solid: {
				value: {
					_light: "{colors.secondary.600}",
					_dark: "{colors.secondary.600}",
				},
			},
			focusRing: {
				value: {
					_light: "{colors.secondary.600}",
					_dark: "{colors.secondary.600}",
				},
			},
		},
		neutral: {
			contrast: {
				value: { _light: "{colors.white}", _dark: "{colors.black}" },
			},
			fg: {
				value: {
					_light: "{colors.neutral.800}",
					_dark: "{colors.neutral.200}",
				},
			},
			subtle: {
				value: {
					_light: "{colors.neutral.100}",
					_dark: "{colors.neutral.900}",
				},
			},
			muted: {
				value: {
					_light: "{colors.neutral.200}",
					_dark: "{colors.neutral.800}",
				},
			},
			emphasized: {
				value: {
					_light: "{colors.neutral.300}",
					_dark: "{colors.neutral.700}",
				},
			},
			solid: {
				value: { _light: "{colors.neutral.900}", _dark: "{colors.white}" },
			},
			focusRing: {
				value: {
					_light: "{colors.neutral.800}",
					_dark: "{colors.neutral.200}",
				},
			},
		},
	},
	shadows,
};
