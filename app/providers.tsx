"use client";

import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: PropsWithChildren) => {
	return (
		<Provider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Provider>
	);
};
