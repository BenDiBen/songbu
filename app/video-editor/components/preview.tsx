import { Player } from "@remotion/player";
import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
const FPS = 30;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

export const Preview = ({ file }: { file: File | null }) => {
	const [src, setSrc] = useState<string | null>(null);

	useEffect(() => {
		if (file) {
			const handleFileRead = (e: ProgressEvent<FileReader>) => {
				setSrc(e.target?.result as string);
			};

			const reader = new FileReader();
			reader.addEventListener("load", handleFileRead);
			reader.addEventListener("error", (e) => console.error(e));
			reader.readAsDataURL(file);

			return () => reader.removeEventListener("load", handleFileRead);
		}
	}, [file]);

	return (
		<Player
			acknowledgeRemotionLicense
			durationInFrames={5 * FPS}
			fps={FPS}
			compositionHeight={VIDEO_HEIGHT}
			compositionWidth={VIDEO_WIDTH}
			component={() => {
				return (
					<AbsoluteFill
						style={{
							backgroundColor: "white",
						}}
					>
						<Sequence durationInFrames={2 * FPS}>
							<h1 style={{ color: "red" }}>Line 1</h1>
						</Sequence>
						<Sequence from={2 * FPS} durationInFrames={2 * FPS}>
							<h1 style={{ color: "red", marginTop: "100px" }}>Line 2</h1>
						</Sequence>
						{src && <Audio src={src} />}
					</AbsoluteFill>
				);
			}}
			inputProps={{ title: "Hello" }}
			loop
			controls
		/>
	);
};
