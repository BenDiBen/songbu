"use client";

import { DragProvider } from "@/components/contexts/drag-provider";
import type { PropsWithChildren } from "react";

export const ImportProviders = ({ children }: PropsWithChildren) => {
	return <DragProvider>{children}</DragProvider>;
};
