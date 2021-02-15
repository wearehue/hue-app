import React from "react";
import {
  Flex,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
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
          align="center"
        >
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  bg="brand.raisin"
                  _hover={{
                    backgroundColor: "brand.raisin",
                  }}
                  _active={{
                    backgroundColor: "brand.raisin",
                  }}
                  fontWeight={400}
                  fontSize={[
                    "0.875rem",
                    "0.875rem",
                    "0.875rem",
                    "1.125rem",
                    "1.125rem",
                  ]}
                >
                  The Hub
                </MenuButton>
                <MenuList bg="brand.raisin" borderColor="brand.blush">
                  <MenuItem
                    _hover={{
                      backgroundColor: "brand.raisin",
                    }}
                    _focus={{
                      backgroundColor: "brand.raisin",
                    }}
                  >
                    <Link
                      _hover={{
                        textDecoration: "none",
                      }}
                      href="https://www.wearehue.org/stateofinequity"
                      isExternal
                    >
                      State of Inequity
                    </Link>
                  </MenuItem>
                  <MenuDivider color="brand.blush" />
                  <MenuItem
                    _hover={{
                      backgroundColor: "brand.raisin",
                    }}
                    _focus={{
                      backgroundColor: "brand.raisin",
                    }}
                  >
                    <Link
                      _hover={{
                        textDecoration: "none",
                      }}
                      href="https://www.wearehue.org/hearmeseeme"
                      isExternal
                    >
                      Hear Me, See Me
                    </Link>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <Link
            ml={6}
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
