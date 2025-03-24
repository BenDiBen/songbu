"use client";

import { type UseStepsReturn, useSteps } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import { STEPS } from "./steps";

const StepsContext = createContext<UseStepsReturn | undefined>(undefined);

export const VideoEditorProviders = ({
	children,
}: { children: React.ReactNode }) => {
	const steps = useSteps({ defaultStep: 0, count: STEPS.length });

	return (
		<StepsContext.Provider value={steps}>{children}</StepsContext.Provider>
	);
};

export const useEditingSteps = () => {
	const context = useContext(StepsContext);
	if (!context) {
		throw new Error(
			"useEditingSteps must be used within a StepsContext.Provider",
		);
	}

	return context;
};
