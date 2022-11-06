import "../styles/global.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { VStack, ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WalletContextProvider from "../context/WalletContextProvider";

const colors = {
	background: "#1F1F1F",
	primary: {
		100: "#bcbfe9",
		200: "#a9ace2",
		300: "#969adc",
		400: "#8388d6",
		500: "#6f75cf",
		600: "#5c63c9",
		700: "#4d54bc",
		800: "#454db4",
		900: "#555dcc",
	},
	text: "rgba(255, 255, 255, 0.75)",
};

const fonts = {
	heading: `'Raleway', sans-serif`,
	body: `'Raleway', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<WalletContextProvider>
				<Head>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<VStack
					w="full"
					minH="100vh"
					bgColor={"background"}
					justify="space-between"
				>
					<Header />

					<Component {...pageProps} />

					<Footer />
				</VStack>
			</WalletContextProvider>
		</ChakraProvider>
	);
}
