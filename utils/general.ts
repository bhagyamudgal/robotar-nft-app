export const shortenAddress = (address: string) => {
	try {
		return address.slice(0, 4) + "..." + address.slice(-4);
	} catch (error) {
		console.error("shortenAddress => ", error);
		return null;
	}
};
