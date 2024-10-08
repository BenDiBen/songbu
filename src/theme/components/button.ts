import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { path } from "ramda";
import tinycolor from "tinycolor2";

const secondary = defineStyle({
	borderWidth: "1px",
	borderColor: "gray.700",
	color: "chakra-body-text",
	_hover: {
		bg: "gray.800",
	},
	_expanded: {
		bg: "gray.800",
	},
});

const gradient = defineStyle((props) => {
	const { theme, colorScheme } = props;

	const getColor = (color: string, index: string, alpha = 1) =>
		tinycolor(path([color, index], theme.colors))
			.setAlpha(alpha)
			.toHex8String();
	const bgColor = mode(
		getColor(colorScheme, "100"),
		getColor("gray", "800"),
	)(props);

	const defaultBackground = `linear-gradient(${bgColor}, ${bgColor}) padding-box, 
      linear-gradient(30deg, ${getColor(colorScheme, "400", 0.8)} 0%,
      ${getColor(colorScheme, "600", 0.8)} 20%,
      ${getColor(colorScheme, "300", 0.8)} 37%,
      ${getColor("gray", "800")} 58%,
      ${getColor("accent", "400", 0.65)} 73%,
      ${getColor("accent", "600", 0.8)} 100%) border-box`;
	const defaultShadow = `-10px 5px 30px -3px ${getColor(colorScheme, "500", 0.5)}, 10px -5px 30px -3px ${getColor("accent", "500", 0.5)}`;
	const hoverBackground = `linear-gradient(${bgColor}, ${bgColor}) padding-box, 
      linear-gradient(30deg, ${getColor(colorScheme, "300", 0.8)} 0%,
      ${getColor(colorScheme, "200", 0.8)} 20%,
      ${getColor(colorScheme, "200", 0.8)} 37%,
      ${getColor("gray", "800")}  58%,
      ${getColor("accent", "200", 0.65)} 73%,
      ${getColor("accent", "300", 0.8)} 100%) border-box`;
	const hoverShadow = `-10px 5px 30px -3px ${getColor(colorScheme, "400", 0.6)}, 10px -5px 30px -3px ${getColor("accent", "400", 0.6)}`;

	const defaultStyle = {
		border: "2px solid",
		borderColor: "transparent",
		background: defaultBackground,
		shadow: defaultShadow,
	};

	const hoverStyle = {
		background: hoverBackground,
		shadow: hoverShadow,
	};

	const disabledStyle = {
		...defaultStyle,
		color: getColor("gray", "300", 0.8),
		opacity: 0.7,
		shadow: "unset",
	};

	return {
		...defaultStyle,
		_hover: {
			...hoverStyle,
			_disabled: disabledStyle,
		},
		_disabled: disabledStyle,
	};
});

export const Button = defineStyleConfig({
	variants: { gradient, secondary },
	defaultProps: { variant: "gradient" },
	baseStyle: { borderRadius: "full" },
});
