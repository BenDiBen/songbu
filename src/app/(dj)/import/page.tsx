import { DragProvider } from "@/components/contexts/drag-provider";
import { Container } from "@chakra-ui/layout";
import { ImportStepper } from "./components/import-stepper";

const LoginPage = () => {
	return (
		<DragProvider>
			<Container
				variant="app"
				display="flex"
				alignItems="stretch"
				flexDirection="column"
			>
				<ImportStepper />
			</Container>
		</DragProvider>
	);
};

export default LoginPage;
