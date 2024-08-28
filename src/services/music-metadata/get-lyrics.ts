import ky from "ky";

export const getLyrics = async (url: string): Promise<string | null> => {
	try {
		const response = await ky.get(url, {
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			mode: "no-cors",
		});
		const html = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html");

		// Try to get lyrics from the `.lyrics` div
		let lyrics = doc.querySelector("div.lyrics")?.textContent?.trim() || "";

		if (lyrics) {
			return lyrics;
		}

		lyrics = Array.from(doc.querySelectorAll('div[class^="Lyrics__Container"]'))
			.map((container) => {
				const snippet = container.innerHTML
					.replace(/<br>/g, "\n")
					.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
				return new DOMParser()
					.parseFromString(snippet, "text/html")
					.documentElement.textContent?.trim();
			})
			.filter(Boolean)
			.join("\n\n");

		return lyrics ?? null;
	} catch (error) {
		console.error(error);

		return null;
	}
};
