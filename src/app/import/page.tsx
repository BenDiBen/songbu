import { Container } from "@chakra-ui/layout";
import { ImportWizard } from "./components/import-wizard";

const steps = [
	{ title: "First", description: "Contact Info" },
	{ title: "Second", description: "Date & Time" },
	{ title: "Third", description: "Select Rooms" },
];

const Home = () => {
	return (
		<Container variant="app">
			<ImportWizard />
		</Container>
	);
};

export default Home;
