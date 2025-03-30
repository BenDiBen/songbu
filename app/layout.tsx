import "@fontsource-variable/tilt-neon/full.css";
import type { Metadata } from "next";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
	title: "Songbu",
	description: "The Karaoke Jockey's best friend",
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html suppressHydrationWarning lang="en">
		<body>
			<AppProviders>{children}</AppProviders>
		</body>
	</html>
);

export default RootLayout;
