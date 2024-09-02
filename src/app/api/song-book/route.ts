import type { SongBook } from "@/types/song-book";
import { getUser } from "@/utils/server/get-user";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
	const user = getUser();

	if (!user) {
		return NextResponse.json({ error: "Not authorized" }, { status: 401 });
	}

	try {
		const { name, artists }: SongBook = await req.json();

		const songbook = await prisma.songbook.create({
			data: {
				user: { connect: { id: user.id } },
				name,
				artists: {
					create: artists.map(
						(artist: { name: string; songs: { title: string }[] }) => ({
							name: artist.name,
							songs: {
								create: artist.songs.map((song) => ({
									title: song.title,
								})),
							},
						}),
					),
				},
			},
		});

		return NextResponse.json(
			{ id: songbook.id, name: songbook.name },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error creating song book" },
			{ status: 500 },
		);
	}
};
