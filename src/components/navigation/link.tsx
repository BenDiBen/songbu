"use client";

import { Link as ChakraLink } from "@chakra-ui/layout";
import {
	Link as NextLink,
	type LinkProps as NextLinkProps,
} from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

export interface LinkProps extends Omit<NextLinkProps, "href"> {
	href?: string;
	isActive?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	({ isActive, href, children, ...props }, ref) => {
		if (!href) {
			return (
				<ChakraLink {...props} ref={ref}>
					{children}
				</ChakraLink>
			);
		}

		const pathname = usePathname();
		const isLinkActive = isActive === undefined ? pathname === href : isActive;
		const ariaCurrent = isLinkActive ? "page" : undefined;

		return (
			<NextLink href={href} {...props} ref={ref} aria-current={ariaCurrent}>
				{children}
			</NextLink>
		);
	},
);

Link.displayName = "Link";
