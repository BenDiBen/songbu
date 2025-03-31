import type { VideoContextValue } from "./types";

export const STEPS = [
	{
		title: "Upload Backtrack",
		description: "Upload your backtrack",
		isComplete: (context: VideoContextValue) => context.backtrack !== undefined,
	},
	{
		title: "Upload Lyrics",
		description: "Upload the lyrics for your song",
		isComplete: (context: VideoContextValue) => context.lyrics !== undefined,
	},
	{
		title: "Sync Lyrics",
		description: "Sync the songs lyrics to the backtrack",
		isComplete: (context: VideoContextValue) => context.keyframes.length > 1,
	},
];
