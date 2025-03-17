import { Provider } from "@/components/ui/provider";
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
			<Provider>{children}</Provider>
		</body>
	</html>
);

export default RootLayout;
