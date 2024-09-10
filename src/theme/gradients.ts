import tinycolor from "tinycolor2";
import { colors } from "./colors";

type ButtonGradientOptions = {
	from: keyof typeof colors;
	to: keyof typeof colors;
	deg: number;
};

const defaultOptions: ButtonGradientOptions = {
	from: "brand",
	to: "accent",
	deg: 45,
};

export const getButtonGradient = ({
	from,
	to,
	deg,
}: ButtonGradientOptions | undefined = defaultOptions) => `linear-gradient(
      ${deg}deg,
      ${colors[from][400]} 0%,
      ${tinycolor(colors[from][600]).setAlpha(0.8).toHexString()} 20%,
      ${tinycolor(colors[from][300]).setAlpha(0.8).toHexString()} 37%,
      transparent 58%,
      ${tinycolor(colors[to][400]).setAlpha(0.65).toHexString()} 73%,
      ${colors[to][600]} 100%
    )`;
