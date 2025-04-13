export type Keyframe = {
	position: number;
};

export type VideoContextValue = {
	isLoading: boolean;
	backtrack?: string;
	lyrics?: string;
	keyframes: Keyframe[];
};

export type VideoContextReturn = VideoContextValue & {
	setBacktrack: (backtrack: string) => void;
	setIsLoading: (lyrics: boolean) => void;
	setLyrics: (lyrics: string) => void;
	setKeyframes: (keyframes: Keyframe[]) => void;
};

export type Line = {
	id: string;
	content: string;
	start: number;
	end: number;
};

export type Frame = {
	id: string;
	start: number;
	end: number;
	lines: Line[];
};
