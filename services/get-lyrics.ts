import { load } from "cheerio";
import type { AnyNode } from "domhandler";
import ky from "ky";

export const getLyrics = async (
	url: string,
): Promise<
	{ lineNumber: number; content: string; hasBreak: boolean }[] | null
> => {
	if (!url) {
		return null;
	}

	try {
		const response = await ky(url, { mode: "no-cors" });
		const html = await response.text();

		// Load the HTML into Cheerio
		const $ = load(html);

		// Select the container that holds the lyrics
		const lyricsContainer = $('[data-lyrics-container="true"]');

		const text: { lineNumber: number; content: string; hasBreak: boolean }[] =
			[];
		let lineNumber = 0;

		// Function to extract text from elements recursively
		const extractText = (element: AnyNode) => {
			$(element)
				.contents()
				.each((_, child) => {
					if (child.type === "text") {
						const content = $(child).text().trim();
						if (content) {
							text.push({ lineNumber: lineNumber++, content, hasBreak: false });
						}
					} else if (
						child.type === "tag" &&
						["a", "span"].includes(child.name)
					) {
						extractText(child);
					}
				});
		};

		lyricsContainer.each((_, element) => extractText(element));

		return text ?? null;
	} catch (error) {
		console.error(error);

		return null;
	}
};
