import { Box, Center, Image, Skeleton, Text } from "@chakra-ui/react";
import { JsonMetadata, Metadata, Nft, Sft } from "@metaplex-foundation/js";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

type Props = {
	nftDetails: Metadata | Nft | Sft;
};

const NFTCard = ({ nftDetails }: Props) => {
	const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
	const [metadata, setMetadata] = useState<JsonMetadata>();

	const fetchNftMetadata = async () => {
		setIsFetchingMetadata(true);

		const response = await fetch(nftDetails?.uri);
		if (response.ok) {
			const result: JsonMetadata = await response.json();
			setMetadata(result);
			setIsFetchingMetadata(false);
		}
	};

	useEffect(() => {
		fetchNftMetadata();
	}, []); //eslint-disable-line

	if (isFetchingMetadata) {
		return (
			<Box m={4} w="90%" maxW={300} p={2} mx="auto">
				<Skeleton minH={380} maxW={300} />
			</Box>
		);
	} else {
		return (
			<Box m={4} w="90%" maxW={300} p={2} bgColor="primary.500" mx="auto">
				<Image
					src={metadata?.image}
					alt={nftDetails?.name}
					w="full"
					fallback={
						<Center minH={280}>
							<LoadingSpinner
								size="lg"
								text="Loading Image"
								textColor="text"
							/>
						</Center>
					}
				/>

				<Text
					align="center"
					fontSize="2xl"
					fontWeight="semibold"
					my={4}
					color="text"
				>
					{metadata?.name}
				</Text>
			</Box>
		);
	}
};

export default NFTCard;
