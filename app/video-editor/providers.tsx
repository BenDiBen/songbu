"use client";

import { Steps, type UseStepsReturn, useSteps } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useState } from "react";
import { STEPS } from "./steps";
import type { Keyframe, VideoContextReturn, VideoContextValue } from "./types";

const StepsContext = createContext<UseStepsReturn | undefined>(undefined);

const NotInitiailized = () => {
	throw new Error("Context not initialized");
};

const VideoContext = createContext<VideoContextReturn>({
	isLoading: false,
	keyframes: [],
	setBacktrack: NotInitiailized,
	setIsLoading: NotInitiailized,
	setLyrics: NotInitiailized,
	setKeyframes: NotInitiailized,
});

export const VideoEditorProviders = ({
	children,
}: { children: React.ReactNode }) => {
	const steps = useSteps({ defaultStep: 2, count: STEPS.length });
	const [videoContext, setVideoContext] = useState<VideoContextValue>({
		isLoading: false,
		keyframes: [],
	});

	const setBacktrack = useCallback(
		(backtrack: string) => setVideoContext((prev) => ({ ...prev, backtrack })),
		[],
	);

	const setIsLoading = useCallback(
		(isLoading: boolean) => setVideoContext((prev) => ({ ...prev, isLoading })),
		[],
	);

	const setLyrics = useCallback(
		(lyrics: string) => setVideoContext((prev) => ({ ...prev, lyrics })),
		[],
	);

	const setKeyframes = useCallback(
		(keyframes: Keyframe[]) =>
			setVideoContext((prev) => ({ ...prev, keyframes })),
		[],
	);

	return (
		<StepsContext.Provider value={steps}>
			<Steps.RootProvider value={steps}>
				<VideoContext.Provider
					value={{
						...videoContext,
						setBacktrack,
						setLyrics,
						setKeyframes,
						setIsLoading,
					}}
				>
					{children}
				</VideoContext.Provider>
			</Steps.RootProvider>
		</StepsContext.Provider>
	);
};

export const useVideoContext = () => useContext(VideoContext);

export const useEditingSteps = () => {
	const context = useContext(StepsContext);
	if (!context) {
		throw new Error(
			"useEditingSteps must be used within a StepsContext.Provider",
		);
	}

	return context;
};
