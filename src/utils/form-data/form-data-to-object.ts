export const formDataToObject = (
	formData: FormData,
): { [key: string]: unknown } => {
	const result: { [key: string]: unknown } = {};

	formData.forEach((value, key) => {
		if (result[key]) {
			if (Array.isArray(result[key])) {
				result[key].push(value);
			} else {
				result[key] = [result[key], value];
			}
		} else {
			result[key] = value;
		}
	});

	return result;
};
