import React, { useState } from "react";
import Nav from "../components/Nav";
import { Input, Flex, Button } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

function Auth({ children }) {
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);
  const [finalValue, setFinalValue] = useState("");

  const displayPage = () => {
    setFinalValue(value);
  };

  const heightValue = finalValue === "468hue" ? "100%" : "100vh";

  return (
    <Flex bg="brand.raisin" height={heightValue} direction="column">
      {finalValue !== "468hue" && (
        <>
          <Nav
            type="auth"
            logoSize={["3.5rem", "3.5rem", "10rem", "10rem", "10rem"]}
          />
          <Flex justify="center" marginTop="15rem">
            <Input
              type="password"
              value={value}
              onChange={handleChange}
              placeholder="Password"
              size="lg"
              w={300}
              border="none"
              borderRadius="0px"
              borderBottom="2px solid"
              fontSize="20px"
              color="brand.sand"
            />
            <Button
              rightIcon={<FaArrowRight />}
              color="brand.sand"
              variant="link"
              size="lg"
              borderRadius="0px"
              borderBottom="2px solid"
              onClick={displayPage}
            ></Button>
          </Flex>
        </>
      )}
      {finalValue === "468hue" && children}
    </Flex>
  );
}

export default Auth;
