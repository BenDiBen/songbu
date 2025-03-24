"use client";

import { Steps, type UseStepsReturn, useSteps } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import { STEPS } from "./steps";
import type { Keyframe, VideoContextReturn, VideoContextValue } from "./types";

const StepsContext = createContext<UseStepsReturn | undefined>(undefined);

const NotInitiailized = () => {
	throw new Error("Context not initialized");
};

const VideoContext = createContext<VideoContextReturn>({
	keyframes: [],
	setBacktrack: NotInitiailized,
	setLyrics: NotInitiailized,
	setKeyframes: NotInitiailized,
});

export const VideoEditorProviders = ({
	children,
}: { children: React.ReactNode }) => {
	const steps = useSteps({ defaultStep: 0, count: STEPS.length });
	const [videoContext, setVideoContext] = useState<VideoContextValue>({
		keyframes: [],
	});

	return (
		<StepsContext.Provider value={steps}>
			<Steps.RootProvider value={steps}>
				<VideoContext.Provider
					value={{ ...videoContext, setBacktrack, setLyrics, setKeyframes }}
				>
					{children}
				</VideoContext.Provider>
			</Steps.RootProvider>
		</StepsContext.Provider>
	);

	function setBacktrack(backtrack: string) {
		setVideoContext((prev) => ({ ...prev, backtrack }));
	}

	function setLyrics(lyrics: string) {
		setVideoContext((prev) => ({ ...prev, lyrics }));
	}

	function setKeyframes(keyframes: Keyframe[]) {
		setVideoContext((prev) => ({ ...prev, keyframes }));
	}
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
