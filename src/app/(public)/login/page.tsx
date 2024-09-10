"use client";

import { login } from "@/actions/login";
import { FormError } from "@/components/forms/form-error";
import { FormInput } from "@/components/forms/form-input";
import { FormStateProvider } from "@/components/forms/form-state-provider";
import { Logo } from "@/components/media/logo";
import { Button } from "@chakra-ui/button";
import { Container, Divider, HStack, Stack, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link";

const LoginPage = () => {
	return (
		<Container variant="app-thin" display="flex" alignItems="center">
			<FormStateProvider action={login}>
				<Stack spacing={32} alignItems="center">
					<Logo transform={{ base: "scale(0.75, 0.75)", md: "unset" }} />
					<Stack>
						<FormInput
							label="Email"
							name="email"
							inputProps={{ width: "xs", type: "email", isRequired: true }}
						/>
						<FormInput
							label="Password"
							name="password"
							inputProps={{ width: "xs", type: "password", isRequired: true }}
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
						<Button type="submit">Log In</Button>
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
			</FormStateProvider>
		</Container>
	);
};

export default LoginPage;
