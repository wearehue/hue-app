import React from "react";
import { Flex, Input, Select } from "@chakra-ui/react";

function FilterBar(props) {
  const {
    expertiseValue,
    handleExpertiseChange,
    expertiseOptions,
    experienceValue,
    handleExperienceChange,
    experienceOptions,
    searchValue,
    handleSearchChange,
  } = props;

  return (
    <Flex
      mt={10}
      justify="space-between"
      direction={["column", "column", "row", "row"]}
      align={["center", "center", "normal", "normal"]}
      width="100%"
      mb={10}
    >
      <Select
        value={expertiseValue}
        onChange={handleExpertiseChange}
        color="brand.blush"
        mr={[0, 0, 3, 12, 12]}
        mb={[5, 5, 0, 0, 0]}
        borderColor="brand.blush"
        aria-label="Filter by areas of expertise"
      >
        <option value="" style={{ color: "black" }}>
          All areas of expertise
        </option>
        {expertiseOptions.map((expertise) => {
          return (
            <option
              value={expertise}
              key={expertise}
              style={{ color: "black" }}
            >
              {expertise}
            </option>
          );
        })}
      </Select>
      <Select
        value={experienceValue}
        onChange={handleExperienceChange}
        color="brand.blush"
        mr={[0, 0, 3, 12, 12]}
        mb={[5, 5, 0, 0, 0]}
        borderColor="brand.blush"
        aria-label="Filter by years of expertise"
      >
        <option value="" style={{ color: "black" }}>
          All experience levels
        </option>
        {experienceOptions.map((experience) => {
          return (
            <option
              value={experience}
              key={experience}
              style={{ color: "black" }}
            >
              {experience}
            </option>
          );
        })}
      </Select>
      <Input
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search"
        color="brand.blush"
        borderColor="brand.blush"
        aria-label="Search"
      />
    </Flex>
  );
}

export default FilterBar;
