import { AppProviders } from "@/app/providers";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

const ColorModeScriptWrapper = dynamic(
	() => import("./components/color-mode-script-wrapper"),
	{ ssr: false },
);

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<ColorModeScriptWrapper />
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
