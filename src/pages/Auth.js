import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Input, Flex, Button, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

function Auth({ children }) {
  const STATE_KEY = "password";
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);
  const [finalValue, setFinalValue] = useState(
    sessionStorage.getItem(STATE_KEY) || ""
  );
  const [error, setError] = useState("");

  const displayPage = () => {
    setFinalValue(value);
    if (finalValue !== "468hue") setError("Please try again.");
  };

  useEffect(() => {
    if (finalValue === "468hue") {
      setError("");
      sessionStorage.setItem(STATE_KEY, finalValue);
    }
  }, [finalValue]);

  const heightValue = finalValue === "468hue" ? "100%" : "100vh";

  return (
    <Flex bg="brand.raisin" height={heightValue} direction="column">
      {finalValue !== "468hue" && (
        <>
          <Nav
            type="auth"
            logoSize={["5rem", "5rem", "5rem", "7rem", "7rem"]}
          />
          <Flex justify="center" marginTop="10rem">
            <Input
              type="password"
              value={value}
              onChange={handleChange}
              placeholder="Password"
              size="lg"
              w={250}
              border="none"
              borderRadius="0px"
              borderBottom="2px solid"
              fontSize="16px"
              color="brand.sand"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  displayPage();
                }
              }}
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
          {error && (
            <Flex justify="center">
              <Text color="white" bg="#f0523d" p="1rem" w={300}>
                {error}
              </Text>
            </Flex>
          )}
        </>
      )}
      {finalValue === "468hue" && children}
    </Flex>
  );
}

export default Auth;
