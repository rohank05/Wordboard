import type { Metadata } from "next";
import "./globals.css";
import Providers from "./lib/store/Providers";
import Loader from "./components/custom/Loader";

export const metadata: Metadata = {
	title: "Workboard",
	description: "Better management through task organisation",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Loader />

					{children}
				</Providers>
			</body>
		</html>
	);
}
