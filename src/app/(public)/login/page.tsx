"use client";

import { login } from "@/actions/login";
import { FormError } from "@/components/forms/form-error";
import { FormInput } from "@/components/forms/form-input";
import { FormStateProvider } from "@/components/forms/form-state-provider";
import { SubmitButton } from "@/components/forms/submit-button";
import { Logo } from "@/components/media/logo";
import { type LoginRequest, schema } from "@/types/requests/login";
import { Button } from "@chakra-ui/button";
import { Container, Divider, HStack, Stack, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/next-js";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

const LoginPage = () => {
	const form = useForm<LoginRequest>({
		resolver: zodResolver(schema),
	});

	return (
		<Container variant="app-thin" display="flex" alignItems="center">
			<FormStateProvider action={login} form={form}>
				<Stack spacing={8} alignItems="center">
					<Logo transform={{ base: "scale(0.75, 0.75)", md: "unset" }} />
					<Stack minHeight="md" justifyContent="center">
						<FormInput
							label="Email"
							inputProps={{ width: "xs", ...form.register("email") }}
						/>
						<FormInput
							label="Password"
							inputProps={{
								width: "xs",
								type: "password",
								...form.register("password"),
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
			</FormStateProvider>
		</Container>
	);
};

export default LoginPage;
