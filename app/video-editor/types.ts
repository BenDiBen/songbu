export type Keyframe = {
	position: number;
};

export type VideoContextValue = {
	backtrack?: string;
	lyrics?: string;
	keyframes: Keyframe[];
};

export type VideoContextReturn = VideoContextValue & {
	setBacktrack: (backtrack: string) => void;
	setLyrics: (lyrics: string) => void;
	setKeyframes: (keyframes: Keyframe[]) => void;
};
