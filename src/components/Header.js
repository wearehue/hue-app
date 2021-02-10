import React from "react";
import Nav from "./Nav";
import { Link as ReactLink } from "react-router-dom";
import { Box, Heading, Text, Flex, Link } from "@chakra-ui/react";

function Header({ type, logoSize }) {
  const linkPath = type === "talent" ? "/supporters" : "/talent";
  const linkText =
    type === "talent"
      ? "View the supporter gallery"
      : "View the talent gallery";
  const title = type === "talent" ? "talent gallery" : "supporter gallery";
  const subtitle =
    type === "talent"
      ? "This gallery is for members: marketing leaders of color looking to connect."
      : "This gallery is for members of color to reach out to supporters.";

  return (
    <>
      <Box
        position="fixed"
        bg="brand.raisin"
        w="100%"
        height={100}
        zIndex="1000"
      >
        <Nav logoSize={logoSize} />
      </Box>
      <Flex
        align="center"
        direction="column"
        mb={6}
        mr={8}
        ml={8}
        pt={[40, 40, 60, 200, 200]}
      >
        <Heading
          as="h1"
          size="xl"
          mb={6}
          color="brand.blush"
          textAlign="center"
        >
          {title}
        </Heading>
        <Text
          fontSize="lg"
          fontWeight="700"
          p={[4, 4, 2, 2]}
          color="brand.blush"
          textAlign="center"
        >
          {subtitle}
        </Text>
        <Text
          fontSize="md"
          color="brand.blush"
          p={[4, 4, 2, 2]}
          textAlign="center"
        >
          Pro Tip: Use Filter and Search functions to hone in on expertise and
          experience level.
        </Text>
        <Flex direction={["column", "column", "row", "row", "row"]}>
          <Link
            as={ReactLink}
            to={linkPath}
            color="brand.ginger"
            textDecoration="underline"
            mr={4}
            mb={2}
          >
            {linkText}
          </Link>
          <Link
            as={ReactLink}
            to="https://www.wearehue.org/jobs"
            color="brand.ginger"
            textDecoration="underline"
          >
            View the job board
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default Header;
