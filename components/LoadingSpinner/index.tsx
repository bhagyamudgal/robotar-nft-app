import { VStack, Spinner, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
	size?: string;
	text?: string;
};

const LoadingSpinner = ({ size = "md", text }: Props) => {
	return (
		<VStack spacing={3} justify="center">
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="primary.600"
				size={size}
			/>
			{text && (
				<Text
					color="primary.600"
					fontSize="lg"
					fontWeight="medium"
					align="center"
				>
					{text}
				</Text>
			)}
		</VStack>
	);
};

export default LoadingSpinner;
