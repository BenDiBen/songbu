import { DragProvider } from "@/components/contexts/drag-provider";
import { ImportStepper } from "./components/import-stepper";

const LoginPage = () => {
	return (
		<DragProvider>
			<ImportStepper />
		</DragProvider>
	);
};

export default LoginPage;
