import React from "react";
import { Icon, Flex, Link } from "@chakra-ui/react";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer({ type }) {
  return (
    <Flex
      bg="brand.earth"
      color="brand.blush"
      textDecoration="underline"
      direction="column"
      pt={10}
      pb={10}
      pl={6}
      pr={6}
    >
      <Link
        href="https://www.wearehue.org/about"
        isExternal
        m={3}
        pt={12}
        borderTop="2px solid white"
        fontWeight="bold"
      >
        About Us
      </Link>
      <Link href="mailto:hello@wearehue.org" isExternal m={3} fontWeight="bold">
        hello@wearehue.org
      </Link>
      <Flex m={3}>
        <Link
          href="https://www.linkedin.com/company/huehq"
          isExternal
          aria-label="Go to Hue linkedin page"
        >
          <Icon
            as={FaLinkedinIn}
            color="white"
            boxSize={6}
            mr={4}
            _hover={{
              color: "brand.blush",
            }}
          />
        </Link>
        <Link
          href="https://twitter.com/we_are_hue"
          isExternal
          aria-label="Go to Hue twitter page"
        >
          <Icon
            as={FaTwitter}
            color="white"
            boxSize={6}
            mr={4}
            _hover={{
              color: "brand.blush",
            }}
          />
        </Link>
        <Link
          href="https://www.instagram.com/we.are.hue/"
          isExternal
          aria-label="Go to Hue instagram page"
        >
          <Icon
            as={FaInstagram}
            color="white"
            boxSize={6}
            mr={4}
            _hover={{
              color: "brand.blush",
            }}
          />
        </Link>
      </Flex>
      <Link href="https://www.wearehue.org/privacy-policy" isExternal m={3}>
        Privacy
      </Link>
      <Link href="https://www.wearehue.org/terms-of-use" isExternal m={3}>
        Terms of Use
      </Link>
    </Flex>
  );
}

export default Footer;
