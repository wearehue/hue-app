import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Rotate as Hamburger } from "hamburger-react";
import { Link, Flex } from "@chakra-ui/react";

const styles = {
  bmBurgerButton: {
    display: "none",
  },
  bmBurgerBars: {
    display: "none",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    display: "none",
  },
  bmCross: {
    background: "#ECD6C6",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    width: "100%",
    marginTop: "3rem",
  },
  bmMenu: {
    background: "#261B19",
    padding: "4.7em 0.5em 0",
    fontSize: "2em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "white",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

function MobileNav() {
  const [isOpen, setOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  return (
    <Flex display={["flex", "flex", "none", "none"]}>
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        onToggle={(toggled) => {
          if (toggled) {
            setMenuIsOpen(false);
          } else {
            setMenuIsOpen(true);
          }
        }}
        color="white"
        label="Show menu"
      />
      <Menu styles={styles} isOpen={menuIsOpen}>
        <Link href="http://wearehue.org/stateofinequity" isExternal>
          The Hub
        </Link>
        <Link href="https://www.wearehue.org/talent" isExternal>
          For Talent of Color
        </Link>
        <Link href="https://www.wearehue.org/employers" isExternal>
          For Employers
        </Link>
        <Link href="https://www.wearehue.org/about" isExternal>
          About Us
        </Link>
      </Menu>
    </Flex>
  );
}

export default MobileNav;
