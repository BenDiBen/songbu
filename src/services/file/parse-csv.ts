import Papa from "papaparse";

export const parseCsv = async (
	file: File | undefined,
	{ signal, maxLines }: { signal: AbortSignal; maxLines?: number },
) => {
	if (!file) {
		return { headers: [], rows: [] };
	}

	const reader = file.stream().getReader();
	const decoder = new TextDecoder("utf-8");
	let result = "";
	let done = false;
	let linesRead = 0;

	while (!done) {
		if (signal.aborted) {
			reader.cancel();
			throw new Error("Operation aborted");
		}

		const { value, done: readerDone } = await reader.read();
		done = readerDone;

		if (!value) {
			continue;
		}

		result += decoder.decode(value, { stream: true });
		const readLines = result.split("\n");
		linesRead = readLines.length - 1; 

		if (maxLines && linesRead >= maxLines) {
			result = readLines.slice(0, maxLines).join("\n");
			done = true;
		}
	}

	// Parse the first 10 lines using PapaParse
	const parsed = Papa.parse(result, {
		header: true,
		skipEmptyLines: true,
	});

	const headers = parsed.meta.fields || [];
	const rows = parsed.data as Record<string, string>[];

	return { headers, rows };
};
