"use client";

import { FormError } from "@/components/forms/form-error";
import { FormInput } from "@/components/forms/form-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { Logo } from "@/components/media/logo";
import { Button } from "@chakra-ui/button";
import { Container, Divider, HStack, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { SignUpFormProvider } from "./components/login-form-provider";

const SignUpPage = () => {
	return (
		<Container variant="app-thin" display="flex" alignItems="center">
			<SignUpFormProvider>
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
						<FormInput
							label="Repeat Password"
							inputProps={{
								width: "xs",
								type: "password",
								name: "repeatPassword",
							}}
						/>
						<FormError />
					</Stack>
					<Stack width="xs" spacing={6}>
						<SubmitButton>Log In</SubmitButton>
						<HStack>
							<Divider />
							<Text fontSize="sm">or</Text>
							<Divider />
						</HStack>
						<NextLink href="/signup">
							<Button variant="outline" colorScheme="gray" w="full">
								Sign Up
							</Button>
						</NextLink>
					</Stack>
				</Stack>
			</SignUpFormProvider>
		</Container>
	);
};

export default SignUpPage;
