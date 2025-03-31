import "@fontsource-variable/tilt-neon/full.css";
import type { Metadata } from "next";
import { AppProviders } from "./providers";

const description = `Enhance your karaoke experience with Songbu - the ultimate tool for KJ professionals and enthusiasts.
	Create custom karaoke videos with perfect timing and stunning visuals.
	No coding skills required. Get started now!`;
const title = "Songbu - The Karaoke Jockey's Best Friend";

export const metadata: Metadata = {
	title,
	description,
	metadataBase: new URL("https://songbu.app"),
	openGraph: {
		title,
		description,
		url: "https://songbu.app",
		siteName: "Songbu",
		images: [
			{
				url: "/open-graph-image.jpg", // Relative to app directory or metadataBase
				width: 1200,
				height: 630,
				alt: "Songbu - Karaoke Management Made Easy",
			},
			{
				url: "/open-graph-square-image.jpg",
				width: 800,
				height: 800,
				alt: "Songbu Logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: {
			url: "/open-graph-image.jpg", // Relative to app directory or metadataBase
			alt: title,
		},
	},
	alternates: {
		canonical: "https://songbu.app",
	},
	robots: {
		index: true,
		follow: true,
	},
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
