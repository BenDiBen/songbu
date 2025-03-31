'use server'

import { getLyrics } from "@/services/get-lyrics"

export const scrapeLyrics = async (url: string) => {
    return await getLyrics(url);
}