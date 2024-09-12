import { FormError } from "@/components/forms/form-error";
import { FormInput } from "@/components/forms/form-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { Logo } from "@/components/media/logo";
import { Link } from "@/components/navigation/link";
import { Button } from "@chakra-ui/button";
import { Container, Divider, HStack, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { LoginFormProvider } from "./components/login-form-provider";

const LoginPage = () => {
	return (
		<Container variant="app-thin" display="flex" alignItems="center">
			<LoginFormProvider>
				<Stack spacing={8} alignItems="center">
					<Logo transform={{ base: "scale(0.75, 0.75)", md: "unset" }} />
					<Stack minHeight="md" justifyContent="center">
						<FormInput
							label="Email"
							inputProps={{ width: "xs", name: "email" }}
						/>
						<FormInput
							label="Password"
							inputProps={{
								width: "xs",
								type: "password",
								name: "password",
							}}
						/>
						<FormError />
						<Link
							href="/reset-password"
							fontWeight="bold"
							color="chakra-subtle-text"
							fontSize="sm"
						>
							Forgot your password?
						</Link>
					</Stack>
					<Stack width="xs" spacing={6}>
						<SubmitButton>Log In</SubmitButton>
						<HStack>
							<Divider />
							<Text fontSize="sm">or</Text>
							<Divider />
						</HStack>
						<NextLink href="/sign-in">
							<Button variant="outline" colorScheme="gray" w="full">
								Sign Up
							</Button>
						</NextLink>
					</Stack>
				</Stack>
			</LoginFormProvider>
		</Container>
	);
};

export default LoginPage;
