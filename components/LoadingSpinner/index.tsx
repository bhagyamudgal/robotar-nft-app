import { VStack, Spinner, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
	size?: string;
	text?: string;
	textColor?: string;
};

const LoadingSpinner = ({
	size = "md",
	text,
	textColor = "primary.600",
}: Props) => {
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
					color={textColor}
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
