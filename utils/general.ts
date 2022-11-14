import { clusterApiUrl, Connection } from "@solana/web3.js";

export const shortenAddress = (address: string) => {
	try {
		return address.slice(0, 4) + "..." + address.slice(-4);
	} catch (error) {
		console.error("shortenAddress => ", error);
		return null;
	}
};

export const getSolanaConnection = () => {
	const connection = new Connection(clusterApiUrl("devnet"));

	return connection;
};
