import {
	Button,
	Center,
	Container,
	Grid,
	GridItem,
	Heading,
	Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	FindNftsByOwnerOutput,
	Metaplex,
	walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { getSolanaConnection } from "../utils/general";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { COLLECTION_NFT_ADDRESS } from "../utils/env";
import LoadingSpinner from "../components/LoadingSpinner";
import NFTCard from "../components/NFTCard";
import NextLink from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const MyNfts = () => {
	const router = useRouter();
	const wallet = useWallet();
	const { connection } = useConnection();

	const [isFetchingNftsFromWallet, setIsFetchingNftsFromWallet] =
		useState(false);
	const [fetchedNfts, setFetchedNfts] = useState<FindNftsByOwnerOutput>();

	const fetchAllNftsFromWallet = async () => {
		if (!wallet.publicKey) {
			setIsFetchingNftsFromWallet(false);
			return;
		}

		setIsFetchingNftsFromWallet(true);

		try {
			const metaplex = Metaplex.make(connection).use(
				walletAdapterIdentity(wallet)
			);

			const nfts = await metaplex
				.nfts()
				.findAllByOwner({ owner: wallet.publicKey });

			const robotarNfts = nfts.filter(
				(nft) =>
					nft.collection?.address.toString() ===
					COLLECTION_NFT_ADDRESS
			);

			setFetchedNfts(robotarNfts);
		} catch (error) {
			console.error("fetchAllNftsFromWallet =>", error);
		}

		setIsFetchingNftsFromWallet(false);
	};

	useEffect(() => {
		if (wallet.connected) {
			fetchAllNftsFromWallet();
		} else {
			router.replace("/");
		}
	}, [wallet]); // eslint-disable-line

	const renderNfts = () => {
		if (isFetchingNftsFromWallet) {
			return (
				<Center flexGrow={1}>
					<LoadingSpinner size="xl" text="Loading Your NFTs" />
				</Center>
			);
		} else if (!fetchedNfts) {
			return (
				<Center flexGrow={1}>
					<Text color="red.400" fontSize="2xl" align="center">
						Something went wrong while fetching Robotar NFTs! Please
						try again.
					</Text>
				</Center>
			);
		} else if (fetchedNfts?.length === 0) {
			return (
				<Center flexGrow={1}>
					<Text color="red.400" fontSize="2xl" align="center">
						No Robotar NFTs Found!
					</Text>
				</Center>
			);
		} else {
			return (
				<Grid
					templateColumns={{
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					}}
				>
					{fetchedNfts?.map((nft) => {
						return (
							<GridItem key={nft?.name}>
								<NFTCard nftDetails={nft} />
							</GridItem>
						);
					})}
				</Grid>
			);
		}
	};

	return (
		<Container
			maxW="6xl"
			color="text"
			flexGrow={1}
			display="flex"
			flexDirection="column"
		>
			<Head>
				<title>My NFTs | Robotar NFT Project</title>
				<meta name="The NFT Collection for Robotar NFT Project" />
			</Head>

			<Button
				leftIcon={<BsArrowLeft />}
				href="/"
				as={NextLink}
				colorScheme="primary"
				w={150}
				mb={10}
			>
				Back to Home
			</Button>

			<Heading as="h1" size="2xl" mb={8} textAlign="center">
				Your NFTs
			</Heading>

			{renderNfts()}
		</Container>
	);
};

export default MyNfts;
