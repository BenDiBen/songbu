"use client";

import { FormInput } from "@/components/forms/form-input";
import { Logo } from "@/components/media/logo";
import { Container } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/next-js";
import { Button, Divider, HStack, Stack, Text } from "@chakra-ui/react";

const Login = () => {
	return (
		<Container variant="app-thin">
			<Stack
				height="full"
				spacing={32}
				alignItems="center"
				justifyContent="center"
			>
				<Logo transform={{ base: "scale(0.75, 0.75)", md: "unset" }} />
				<Stack mt="-56px">
					<FormInput label="Email" name="email" inputProps={{ width: "xs" }} />
					<FormInput
						label="Password"
						name="password"
						inputProps={{ width: "xs" }}
					/>
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
					<Button>Log In</Button>
					<HStack>
						<Divider />
						<Text fontSize="sm">or</Text>
						<Divider />
					</HStack>
					<Button variant="outline" colorScheme="gray">
						Sign Up
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};

export default Login;
