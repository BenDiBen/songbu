import { Container } from "@chakra-ui/react";
import { Header } from "./header";

const HomePage = () => {
	return (
		<Container display="flex" flexDir="column">
			<Header />
		</Container>
	);
};

export default HomePage;
