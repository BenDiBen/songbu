import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const withoutSsr = (Component: ComponentType) =>
	dynamic(() => Promise.resolve(Component), { ssr: false });
