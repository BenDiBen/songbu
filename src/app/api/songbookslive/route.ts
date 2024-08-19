import { decode } from "html-entities";
import { NextResponse } from "next/server";
import puppeteer, { type Browser } from "puppeteer";

const ARTIST_REGEX = /<b>&nbsp;(.*?)<\/b>/;
const TITLE_REGEX = /<i>(.*?)<\/i>/;

export async function GET(request: Request) {
	let browser: Browser | undefined = undefined;
	try {
		const params = new URL(request.url).searchParams;
		const name = params.get("name") ?? undefined;
		let start = performance.now();

		if (!name) {
			return new NextResponse("Please specify the name of the songbook", {
				status: 400,
			});
		}

		browser = await puppeteer.launch({
			headless: true,
			executablePath: puppeteer.executablePath(),
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--ignore-certificate-errors",
			],
		});

		const page = await browser.newPage();

		// Navigate to the URL
		await page.goto("https://www.songbookslive.com/", {
			waitUntil: "networkidle2",
			timeout: 60000,
		});

		// Find the input field and enter the text "sakaraoke"
		await page.waitForSelector("#ctl00_MainContent_txtAccountName");
		await page.type("#ctl00_MainContent_txtAccountName", "sakaraoke");

		// Find the "View" button and click it
		await page.click("#ctl00_MainContent_cmdView");

		// Wait for the "cmdListAll" button to appear and click it
		await page.waitForSelector("#cmdListAll");

		// Handle the confirm dialog
		page.on("dialog", async (dialog) => {
			await dialog.accept();
		});

		await page.click("#cmdListAll");

		// Wait for the page to load fully (adjust the selector based on the actual page content)
		await page.waitForSelector("#lblRecords");

		// Get the page HTML
		const pageHTML = await page.content();

		console.log(`It took ${performance.now() - start}ms to fetch the page`);
		start = performance.now();

		const rows = pageHTML.split(/<\/tr><tr/);

		const result: Record<string, string[]> = {};
		let artist = "unknown";
		let titles: string[] = [];

		for (let index = 0; index < rows.length; index++) {
			const row = rows[index];
			const rowArtist = ARTIST_REGEX.exec(row);

			if (rowArtist) {
				artist = decode(rowArtist[1]);
				titles = [];
				result[artist] = titles;
				continue;
			}

			const rowTitle = TITLE_REGEX.exec(row);

			if (rowTitle) {
				titles.push(decode(rowTitle[1]));
			}
		}

		console.log(`It took ${performance.now() - start}ms to process the page`);

		return Response.json(result, { status: 200 });
	} catch (error) {
		console.error("Error:", error);
		return new NextResponse("Internal server error", { status: 500 });
	} finally {
		if (browser) {
			await browser.close();
		}
	}
}
