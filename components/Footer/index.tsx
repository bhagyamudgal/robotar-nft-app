import { Box, Center, Text, Link } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Center>
			<Text p={6} color="text">
				Developed By{" "}
				<Link
					href="https://www.bhagyamudgal.com/"
					target="_blank"
					rel="noopener noreferrer"
					_hover={{
						color: "accent",
					}}
				>
					Bhagya Mudgal
				</Link>
			</Text>
		</Center>
	);
};

export default Footer;
