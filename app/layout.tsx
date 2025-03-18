import { Provider } from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
		<body className={`${geistSans.variable} ${geistMono.variable}`}>
			<Provider>
				<Box
					top={0}
					left={0}
					position="absolute"
					layerStyle="backdrop"
					minW="100vw"
					minH="100vh"
				/>
				{children}
			</Provider>
		</body>
	</html>
);

export default RootLayout;
