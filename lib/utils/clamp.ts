export const clamp = (num: number, range: { min: number, max: number}) =>
	Math.min(Math.max(num, range.min), range.max);
