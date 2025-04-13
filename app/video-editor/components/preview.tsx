import { useToken } from "@chakra-ui/react";
import { Player, type PlayerRef } from "@remotion/player";
import { produce } from "immer";
import { useEffect, useRef, useState } from "react";
import { AbsoluteFill, Audio as RemotionAudio } from "remotion";
import { FrameTimeline } from "./frame-timeline";
import { FRAMES } from "./frames";
import { LyricsFrame } from "./lyrics-frame";
const FPS = 30;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

export const Preview = ({ file }: { file: File | null }) => {
	const [src, setSrc] = useState<string | null>(null);
	const [durationInSeconds, setDurationInSeconds] = useState(5);
	const backgroundColor = useToken("colors", "bg")?.[0];
	const playerRef = useRef<PlayerRef>(null);
	const [frames, setFrames] = useState(FRAMES);

	useEffect(() => {
		if (!file) {
			return;
		}

		const handleFileRead = (e: ProgressEvent<FileReader>) => {
			setSrc(e.target?.result as string);
		};

		const reader = new FileReader();
		reader.addEventListener("load", handleFileRead);
		reader.addEventListener("error", (e) => console.error(e));
		reader.readAsDataURL(file);

		return () => reader.removeEventListener("load", handleFileRead);
	}, [file]);

	useEffect(() => {
		if (!src) {
			return;
		}

		const audio = new Audio(src);

		const handleMetadataLoaded = () => setDurationInSeconds(audio.duration);

		audio.addEventListener("loadedmetadata", handleMetadataLoaded);

		return () =>
			audio.removeEventListener("loadedmetadata", handleMetadataLoaded);
	}, [src]);

	const durationInFrames = Math.round(durationInSeconds * FPS);

	return (
		<>
			<Player
				ref={playerRef}
				acknowledgeRemotionLicense
				durationInFrames={durationInFrames}
				fps={FPS}
				compositionHeight={VIDEO_HEIGHT}
				compositionWidth={VIDEO_WIDTH}
				component={() => {
					return (
						<AbsoluteFill
							style={{
								backgroundColor,
							}}
						>
							{frames.map((frame, index) => (
								<LyricsFrame key={index} source={frame} />
							))}
							{src && <RemotionAudio src={src} />}
						</AbsoluteFill>
					);
				}}
				inputProps={{ title: "Hello" }}
				loop
				controls
			/>
			{playerRef?.current && (
				<FrameTimeline
					frames={frames}
					fps={FPS}
					durationInFrames={durationInFrames}
					playerRef={playerRef.current}
					onLineChange={handleLineChange}
				/>
			)}
		</>
	);

	function handleLineChange(e: {
		frameIndex: number;
		lineIndex: number;
		position: "start" | "end";
		value: number;
	}): void {
		console.log({ e });
		setFrames(
			produce((draft) => {
				draft[e.frameIndex].lines[e.lineIndex][e.position] = e.value;
			}),
		);
	}
};
