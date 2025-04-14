type SectionRanges = {
	start: {
		min: number;
		max: number;
	};
	end: {
		min: number;
		max: number;
	};
};

type HandleReturn = (
	| {
			key: "start";
			left: number;
			onMouseDown: (e: React.MouseEvent) => void;
	  }
	| {
			key: "end";
			right: number;
			onMouseDown: (e: React.MouseEvent) => void;
	  }
)[];
