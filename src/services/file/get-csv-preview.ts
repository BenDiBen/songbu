import { useQuery } from "@tanstack/react-query";
import { parseCsv } from "./parse-csv";

export const useCsvPreview = (file: File | undefined) =>
	useQuery({
		queryKey: ["file", "preview", file?.name],
		queryFn: (options) => parseCsv(file, { ...options, maxLines: 10 }),
	});
