import Head from "next/head";
import {
	Box,
	Flex,
	Image,
	VStack,
	Text,
	Heading,
	Button,
	Link,
} from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import {
	CandyMachineV2,
	Metaplex,
	NftWithToken,
	walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { CANDY_MACHINE_ID } from "../utils/env";
import { PublicKey } from "@solana/web3.js";
import NFTCard from "../components/NFTCard";
import {
	showErrorToast,
	showSuccessToast,
} from "../components/ToastNotification";

type CandyMachineDetails = {
	price: number;
	currency: string;
	totalNfts: number;
	mintedNfts: number;
};

export default function Home() {
	const wallet = useWallet();
	const { connection } = useConnection();

	const [isFetchingCandyMachine, setIsFetchingCandyMachine] = useState(false);
	const [isMintingNft, setIsMintingNft] = useState(false);
	const [isMintCompleted, setIsMintCompleted] = useState(false);
	const [candyMachine, setCandyMachine] = useState<CandyMachineV2>();
	const [candyMachineDetails, setCandyMachineDetails] =
		useState<CandyMachineDetails>();
	const [mintedNft, setMintedNft] = useState<NftWithToken | null>(null);

	const metaplex = useMemo(() => {
		return Metaplex.make(connection).use(walletAdapterIdentity(wallet));
	}, [connection, wallet]);

	const getCandyMachine = async () => {
		setIsFetchingCandyMachine(true);
		try {
			const candyMachine = await metaplex
				.candyMachinesV2()
				.findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });

			const price =
				candyMachine.price.basisPoints.toNumber() /
				10 ** candyMachine.price.currency.decimals;

			const currency = candyMachine.price.currency.symbol;

			const totalNfts = candyMachine.itemsAvailable.toNumber();

			const mintedNfts = candyMachine.itemsMinted.toNumber();

			const candyMachineDetails = {
				price,
				currency,
				totalNfts,
				mintedNfts,
			};

			setCandyMachine(candyMachine);
			setCandyMachineDetails(candyMachineDetails);
		} catch (error) {
			console.error("getCandyMachine =>", error);
		}
		setIsFetchingCandyMachine(false);
	};

	useEffect(() => {
		if (wallet.connected) {
			getCandyMachine();
		}
	}, [wallet.connected]); //eslint-disable-line

	const mintNft = async () => {
		if (!wallet.connected || !candyMachine) {
			setIsMintingNft(false);
			return;
		}

		setIsMintingNft(true);

		try {
			const mintResponse = await metaplex
				.candyMachinesV2()
				.mint({ candyMachine });

			setMintedNft(mintResponse.nft);
			setIsMintCompleted(true);

			const solscanLink = `https://solscan.io/tx/${mintResponse.response.signature}?cluster=devnet`;

			showSuccessToast({
				id: "mint-nft",
				description: (
					<VStack align="left" spacing={1}>
						<Text>NFT minted successfully!</Text>
						<Link
							href={solscanLink}
							target="_blank"
							rel="noopener noreferrer"
							textDecoration="underline"
						>
							View Transaction
						</Link>
					</VStack>
				),
				duration: 15000,
			});
		} catch (error) {
			console.error("mintNft =>", error);
			showErrorToast({
				id: "mint-nft",
				description: "Something went wrong while minting NFT!",
			});
		}

		setIsMintingNft(false);
	};

	const renderCandyMachine = () => {
		if (isFetchingCandyMachine) {
			return <LoadingSpinner size="lg" text="Loading Candy Machine" />;
		} else if (isMintCompleted && mintedNft) {
			return (
				<VStack spacing={10}>
					<Heading as="h3" size="lg" color="primary.400">
						Here is your newly minted Robotar NFT
					</Heading>
					<NFTCard nftDetails={mintedNft} />
					<Button
						colorScheme="primary"
						onClick={() => {
							setIsMintCompleted(false);
							setMintedNft(null);
							getCandyMachine();
						}}
					>
						Mint Another Robotar NFT
					</Button>
				</VStack>
			);
		} else if (candyMachine && candyMachineDetails) {
			const areNftsSoldOut =
				candyMachineDetails.mintedNfts ===
				candyMachineDetails.totalNfts;
			return (
				<VStack spacing={4}>
					{areNftsSoldOut ? (
						<Text color="red.400" fontSize="xl">
							Robotar NFTs Minted:{" "}
							{candyMachineDetails.mintedNfts}/
							{candyMachineDetails.totalNfts}
						</Text>
					) : (
						<Text color="green.400" fontSize="xl">
							Robotar NFTs Minted:{" "}
							{candyMachineDetails.mintedNfts}/
							{candyMachineDetails.totalNfts}
						</Text>
					)}

					<Text color="primary.400" fontSize="xl">
						Robotar NFT Price: {candyMachineDetails.price}{" "}
						{candyMachineDetails.currency}
					</Text>
					<Button
						colorScheme="primary"
						isLoading={isMintingNft}
						isDisabled={areNftsSoldOut}
						onClick={mintNft}
					>
						{areNftsSoldOut ? "SOLD OUT" : "Mint Robotar NFT"}
					</Button>
				</VStack>
			);
		}
	};

	return (
		<Box w="full" px={5}>
			<Head>
				<title>Robotar NFT Project</title>
				<meta name="The NFT Collection for Robotar NFT Project" />
			</Head>

			<Flex
				direction={{ base: "column", md: "row" }}
				mx="auto"
				maxW="6xl"
				justify="space-between"
				align="center"
			>
				<Image
					src="/images/banner.png"
					alt="robotar-banner"
					fallback={<LoadingSpinner size="xl" text="Loading Image" />}
					h="450px"
					w="350px"
					mb={6}
				/>
				<VStack m={4} justify="center" textAlign="center" spacing={4}>
					<Heading as="h1" size="2xl" color="text">
						Mint Robotar NFT
					</Heading>
					<Heading as="h2" size="xl" color="text">
						Earn $ROBO by staking your Robotar NFT
					</Heading>
					<Text color="text" maxW="xl">
						This Project is a collection of 50 randomly generated
						unique Robotar NFTs. You can mint Robotar NFT and can
						stake them to earn $ROBO
					</Text>

					<Box p="4">
						{wallet.connected ? (
							renderCandyMachine()
						) : (
							<Text
								color="primary.500"
								fontSize="xl"
								fontWeight="medium"
							>
								Please connect your wallet to mint
							</Text>
						)}
					</Box>
				</VStack>
			</Flex>
		</Box>
	);
}
