"use client";

import { signUp } from "@/actions/sign-up";
import { FormInput } from "@/components/forms/form-input";
import { FormStateProvider } from "@/components/forms/form-state-provider";
import { Logo } from "@/components/media/logo";
import { Button } from "@chakra-ui/button";
import { Container, Divider, HStack, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link";

const SignInPage = () => {
	return (
		<Container variant="app-thin" display="flex" alignItems="center">
			<FormStateProvider action={signUp}>
				<Stack height="full" spacing={32} alignItems="center">
					<Logo transform={{ base: "scale(0.75, 0.75)", md: "unset" }} />
					<Stack>
						<FormInput
							label="Email"
							inputProps={{ width: "xs", type: "email", isRequired: true }}
						/>
						<FormInput
							label="Password"
							inputProps={{ width: "xs", type: "password", isRequired: true }}
						/>
						<FormInput
							label="Confirm Password"
							inputProps={{ width: "xs", type: "password", isRequired: true }}
						/>
					</Stack>
					<Stack width="xs" spacing={6}>
						<Button>Sign Up</Button>
						<HStack>
							<Divider />
							<Text fontSize="sm">or</Text>
							<Divider />
						</HStack>
						<NextLink href="/login">
							<Button variant="outline" colorScheme="gray" width="full">
								Log In
							</Button>
						</NextLink>
					</Stack>
				</Stack>
			</FormStateProvider>
		</Container>
	);
};

export default SignInPage;
