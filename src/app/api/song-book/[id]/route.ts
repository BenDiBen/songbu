import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
	const id = "test";

	try {
		const songbook = await prisma.songbook.findUnique({
			where: { id },
			include: {
				artists: {
					include: {
						songs: true,
					},
				},
			},
		});

		if (!songbook) {
			return NextResponse.json(
				{ error: "Songbook not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(songbook);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching songbook" },
			{ status: 500 },
		);
	}
};
