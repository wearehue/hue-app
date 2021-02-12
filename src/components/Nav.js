import React from "react";
import { Flex, Link, Image } from "@chakra-ui/react";
import MobileNav from "./MobileNav";
import logo from "../images/tricolor-lighthue_logo_.png";

function Nav({ type, logoSize }) {
  return (
    <Flex justify="space-between" align="center" p={[4, 4, 8, 8, 8]}>
      <Link href="https://wearehue.org" isExternal>
        <Image src={logo} w={logoSize} alt="Hue logo" />
      </Link>
      {type !== "auth" && (
        <Flex
          color="brand.blush"
          fontSize={["sm", "sm", "sm", "lg"]}
          display={["none", "none", "flex", "flex"]}
        >
          <Link
            mr={6}
            _hover={{
              textDecoration: "none",
            }}
            href="http://wearehue.org/stateofinequity"
            isExternal
          >
            The Hub
          </Link>
          <Link
            mr={6}
            _hover={{
              textDecoration: "none",
            }}
            href="https://www.wearehue.org/talent"
            isExternal
          >
            For Talent of Color
          </Link>
          <Link
            mr={6}
            _hover={{
              textDecoration: "none",
            }}
            href="https://www.wearehue.org/employers"
            isExternal
          >
            For Employers
          </Link>
          <Link
            _hover={{
              textDecoration: "none",
            }}
            href="https://www.wearehue.org/about"
            isExternal
          >
            About Us
          </Link>
        </Flex>
      )}
      {type !== "auth" && (
        <Flex color="brand.blush" display={["flex", "flex", "none", "none"]}>
          <MobileNav />
        </Flex>
      )}
    </Flex>
  );
}

export default Nav;
