import type { PropsWithChildren } from "react";
import { ImportProviders } from "./providers";

const ImportLayout = ({ children }: PropsWithChildren) => {
	return <ImportProviders>{children}</ImportProviders>;
};

export default ImportLayout;
