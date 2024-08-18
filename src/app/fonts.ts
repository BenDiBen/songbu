import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-pacifico",
});

const fonts = {
	pacifico,
};

const className = Object.values(fonts).map((value) => value.className).join(" ");

export { className, fonts };

