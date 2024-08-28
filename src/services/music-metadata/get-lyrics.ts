import ky from "ky";

export const getLyrics = async (
	url: string,
): Promise<
	{ lineNumber: number; content: string; hasBreak: boolean }[] | null
> => {
	try {
		const response = await ky.get(url);
		const html = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html");

		const lyricsContainer = doc.querySelectorAll(
			'[data-lyrics-container="true"]',
		);

		const text: { lineNumber: number; content: string; hasBreak: boolean }[] =
			[];
		let lineNumber = 0;

		// Function to recursively extract text
		const extractText = (node: Element | ChildNode | null) => {
			const nodes = node?.childNodes ?? [];
			for (let index = 0; index < nodes.length; index++) {
				const child = nodes[index];

				if (child.nodeType === Node.TEXT_NODE && child.textContent) {
					text.push({
						lineNumber: lineNumber++,
						content: child.textContent.trim() ?? "",
						hasBreak: false,
					});
				} else if (child.nodeName === "A" || child.nodeName === "SPAN") {
					extractText(child);
				}
			}
		};

		lyricsContainer.forEach(extractText);

		return text ?? null;
	} catch (error) {
		console.error(error);

		return null;
	}
};
