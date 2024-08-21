import { ImportContainer } from "./components/import-container";
import { ImportWizard } from "./components/import-wizard";

const steps = [
	{ title: "First", description: "Contact Info" },
	{ title: "Second", description: "Date & Time" },
	{ title: "Third", description: "Select Rooms" },
];

const Home = () => {
	return (
		<ImportContainer>
			<ImportWizard />
		</ImportContainer>
	);
};

export default Home;
