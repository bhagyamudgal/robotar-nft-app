import { useEffect, useState } from "react";
import { Button, HStack, Link } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { shortenAddress } from "../../utils/general";
import NextLink from "next/link";

const Header = () => {
	const [renderWalletButton, setRenderWalletButton] = useState(false);
	const { connected, publicKey } = useWallet();

	useEffect(() => {
		setRenderWalletButton(true);
	}, []);

	return (
		<HStack p={5} w="full" justify="flex-end" spacing={8}>
			{connected && (
				<Link as={NextLink} href="/my-nfts" color="text">
					My NFTs
				</Link>
			)}

			{renderWalletButton && (
				<Button colorScheme="primary" as={WalletMultiButton}>
					{connected
						? publicKey?.toString() &&
						  shortenAddress(publicKey.toString())
						: "Connect Wallet"}
				</Button>
			)}
		</HStack>
	);
};

export default Header;
