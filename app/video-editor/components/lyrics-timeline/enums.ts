export const SectionUpdateTypes = {
	start: "start",
	end: "end",
	shift: "shift",
} as const;

export type SECTION_UPDATE_TYPES =
	(typeof SectionUpdateTypes)[keyof typeof SectionUpdateTypes];
