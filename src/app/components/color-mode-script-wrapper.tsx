import { theme } from "@/theme";
import { ColorModeScript } from "@chakra-ui/react";

export default () => (
	<ColorModeScript initialColorMode={theme.config.initialColorMode} />
);
