import React from "react";
import { Box, Heading, Text, Icon, Link, Flex, Tag } from "@chakra-ui/react";
import { FaLinkedinIn, FaStar } from "react-icons/fa";

function Card({ record, index, type }) {
  return (
    <Box
      bg="brand.raisin"
      borderRadius="20px"
      boxShadow="lg"
      w={["100%", "100%", "48%", "48%", "48%"]}
      p={8}
      mb={10}
      color="brand.blush"
      key={record.id}
      borderWidth=".125rem"
      borderColor="brand.blush"
      _hover={{
        borderWidth: ".125rem",
        borderColor: "brand.rust",
      }}
    >
      <Heading
        as="h3"
        size="lg"
        mb={4}
        color="brand.melon"
        textTransform="lowercase"
      >
        {record.fields["Name"]}
      </Heading>
      <Flex align="start" mb={4}>
        <Icon as={FaStar} boxSize={6} mr={4} />
        <Text fontSize={["md", "md", "md", "md"]}>
          {record.fields["Short Bio"]}
        </Text>
      </Flex>
      <Box mb={6}>
        <Text
          size="sm"
          mb={2}
          mt={2}
          color="brand.blush"
          fontWeight={700}
          textTransform="uppercase"
        >
          Expertise
        </Text>
        {record.fields["Expertise"].map((expertise) => {
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
      {type === "Talent" ? (
        <Flex mb={4}>
          <Box>
            <Text
              size="sm"
              mb={2}
              mt={2}
              color="brand.blush"
              fontWeight={700}
              textTransform="uppercase"
            >
              Years of Experience
            </Text>
            <Text fontSize={["md", "md", "md", "md"]}>
              {record.fields["Years of Experience"]}
            </Text>
          </Box>
        </Flex>
      ) : (
        <Flex mb={4}>
          <Box>
            <Text
              size="sm"
              mb={2}
              mt={2}
              color="brand.blush"
              fontWeight={700}
              textTransform="uppercase"
            >
              Years of Marketing Experience
            </Text>
            <Text fontSize={["md", "md", "md", "md"]}>
              {record.fields["Years of Marketing Experience"]}
            </Text>
          </Box>
        </Flex>
      )}
      <Box mb={6}>
        <Text
          size="sm"
          mb={2}
          mt={2}
          color="brand.blush"
          fontWeight={700}
          textTransform="uppercase"
        >
          Where I've Worked
        </Text>
        <Text fontSize={["md", "md", "md", "md"]}>
          {record.fields["Where I've Worked"]}
        </Text>
      </Box>
      <Flex align="center" mb={4}>
        <Icon
          as={FaLinkedinIn}
          boxSize={6}
          mr={4}
          _hover={{
            color: "brand.linkedin",
          }}
        />
        <Link
          href={record.fields["LinkedIn"]}
          size="20px"
          isExternal
          _hover={{
            textDecoration: "none",
          }}
        >
          Connect on LinkedIn
        </Link>
      </Flex>
      {type === "Supporters" && record.fields["How I'd Like to Help"] && (
        <Box mb={6}>
          <Text
            size="sm"
            mb={2}
            mt={2}
            color="brand.blush"
            fontWeight={700}
            textTransform="uppercase"
          >
            How I'd Like to Help
          </Text>
          {record.fields["How I'd Like to Help"].map((help) => {
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
    </Box>
  );
}

export default Card;
