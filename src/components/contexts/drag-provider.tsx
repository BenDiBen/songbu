"use client";

import {
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";
import {
	type DropzoneOptions,
	type DropzoneState,
	useDropzone,
} from "react-dropzone";

interface DragContextValue {
	state?: DropzoneState;
	setOptions: Dispatch<SetStateAction<DropzoneOptions>>;
}

const DragContext = createContext<DragContextValue>({
	setOptions: () => {
		throw new Error("Not initialized");
	},
});

export const DragProvider = ({ children }: PropsWithChildren) => {
	const [options, setOptions] = useState<DropzoneOptions>({});
	const state = useDropzone(options);

	return (
		<DragContext.Provider value={{ setOptions, state }}>
			{children}
		</DragContext.Provider>
	);
};

export const useDrag = () => useContext(DragContext);
