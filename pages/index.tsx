import Head from "next/head";
import {
	Box,
	Flex,
	Image,
	VStack,
	Text,
	Heading,
	Button,
} from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useWallet } from "@solana/wallet-adapter-react";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
	const { connected } = useWallet();

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
						{connected ? (
							<Button
								colorScheme="primary"
								rightIcon={<BsArrowRight />}
							>
								Mint Robotar NFT
							</Button>
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
