import React from "react";
import { Box, Heading, Text, Link, Flex, Tag, Button } from "@chakra-ui/react";
import { FaLinkedinIn } from "react-icons/fa";

function Card({ row, type }) {
  return (
    <Box
      bg="brand.raisin"
      borderRadius="20px"
      boxShadow="lg"
      w={["100%", "100%", "47%", "48%", "48%"]}
      p={8}
      mb={10}
      mr="1rem"
      color="brand.blush"
      key={row.id}
      borderWidth=".125rem"
      borderColor="brand.blush"
      _hover={{
        borderWidth: ".125rem",
        borderColor: "brand.sugar",
      }}
    >
      <Heading
        as="h3"
        size="lg"
        mb={4}
        color="brand.melon"
        textTransform="lowercase"
      >
        {row.values["fields.Name"]}
      </Heading>

      <Flex align="start" mb=".5rem">
        <Text fontSize={["md", "md", "md", "md"]}>
          {row.values["fields.Short Bio"]}
        </Text>
      </Flex>
      <Box>
        <Text
          size="sm"
          mt={2}
          color="brand.blush"
          fontWeight={700}
          textTransform="uppercase"
        >
          Expertise
        </Text>
        {row.values["fields.Expertise"].map((expertise) => {
          return (
            <Tag
              size="sm"
              m={2}
              key={expertise}
              bg="brand.blush"
              color="brand.raisin"
            >
              {expertise}
            </Tag>
          );
        })}
      </Box>
      {type === "talent" ? (
        <Flex>
          <Box>
            <Text
              size="sm"
              mt={2}
              color="brand.blush"
              fontWeight={700}
              textTransform="uppercase"
            >
              Years of Experience
            </Text>
            <Text fontSize={["md", "md", "md", "md"]}>
              {row.values["fields.Years of Experience"]}
            </Text>
          </Box>
        </Flex>
      ) : (
        <Flex>
          <Box>
            <Text
              size="sm"
              mt={2}
              color="brand.blush"
              fontWeight={700}
              textTransform="uppercase"
            >
              Years of Marketing Experience
            </Text>
            <Text fontSize={["md", "md", "md", "md"]}>
              {row.values["fields.Years of Marketing Experience"]}
            </Text>
          </Box>
        </Flex>
      )}
      <Box>
        <Text
          size="sm"
          mt={2}
          color="brand.blush"
          fontWeight={700}
          textTransform="uppercase"
        >
          Where I've Worked
        </Text>
        <Text fontSize={["md", "md", "md", "md"]}>
          {row.values["fields.Where I've Worked"]}
        </Text>
      </Box>
      {row.values["fields.Location"] && (
        <>
          <Text
            size="sm"
            mt={2}
            color="brand.blush"
            fontWeight={700}
            textTransform="uppercase"
          >
            Location
          </Text>
          <Text fontSize={["md", "md", "md", "md"]} mb={4}>
            {row.values["fields.Location"]}
          </Text>
        </>
      )}
      {type === "supporters" && row.values["fields.How I'd Like to Help"] && (
        <Box mb={6}>
          <Text
            size="sm"
            mt={2}
            color="brand.blush"
            fontWeight={700}
            textTransform="uppercase"
          >
            How I'd Like to Help
          </Text>
          {row.values["fields.How I'd Like to Help"].map((help) => {
            return (
              <Tag
                size="sm"
                m={2}
                key={help}
                bg="brand.blush"
                color="brand.raisin"
              >
                {help}
              </Tag>
            );
          })}
        </Box>
      )}
      <Flex align="center" mt={4} mb={2}>
        <Link
          href={row.values["fields.LinkedIn"]}
          isExternal
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button
            leftIcon={<FaLinkedinIn />}
            color="white"
            variant="solid"
            textTransform="uppercase"
            fontWeight="900"
            bg="brand.sugar"
            borderRadius="300px"
            aria-label="Visit LinkedIn page"
            _hover={{
              backgroundColor: "#84421E",
              color: "white",
            }}
          >
            Connect
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default Card;
