import React, { useState, useEffect } from "react";
import { Box, Flex, Input, Select } from "@chakra-ui/react";
import Card from "../components/Card";
import { filterByExperience, filterByExpertise, search } from "../utils/filter";

function Supporters({ base, title }) {
  const allRecords = [];
  const [records, setRecords] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);

  const [expertiseValue, setExpertiseValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [experienceOptions, setExperienceOptions] = useState([]);
  const [expertiseOptions, setExpertiseOptions] = useState([]);

  const handleSearchChange = (event) => {
    setRecords(initialRecords);
    setSearchValue(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setRecords(initialRecords);
    setExperienceValue(event.target.value);
  };

  const handleExpertiseChange = (event) => {
    setRecords(initialRecords);
    setExpertiseValue(event.target.value);
  };
  let firstPage = null;
  const processPage = (nextRecords, fetchNextPage) => {
    allRecords.push(...nextRecords);
    if (!firstPage) setRecords(nextRecords);
    firstPage = true;
    fetchNextPage();
  };

  const processRecords = (err) => {
    if (err) {
      console.error(err);
      return;
    }

    setInitialRecords(allRecords);
    setRecords(allRecords);

    const expertiseSet = new Set();
    allRecords.forEach((record) => {
      record.fields["Expertise"].forEach((expertise) => {
        expertiseSet.add(expertise);
      });
    });
    setExpertiseOptions(Array.from(expertiseSet));

    const experienceSet = new Set();
    allRecords.forEach((record) => {
      record.fields["Years of Marketing Experience"].forEach((experience) => {
        experienceSet.add(experience);
      });
    });
    // eslint-disable-next-line array-callback-return
    const experienceArray = Array.from(experienceSet).sort((a, b) => {
      if (a.length < 6 && b.length < 6) {
        const numA = Number.parseInt(a);
        const numB = Number.parseInt(b);
        return numB - numA;
      }
      if (a.length > 6) {
        return 1;
      }
      if (b.length > 6) {
        return -1;
      }
    });
    setExperienceOptions(experienceArray);
  };
  useEffect(() => {
    base("Support POC Supporter Gallery: Live")
      .select({
        sort: [
          { field: "Expertise", direction: "asc" },
          { field: "Years of Marketing Experience", direction: "asc" },
        ],
        view: "Grid view",
      })
      .eachPage(processPage, processRecords);
    document.title = title || "";
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredRecords = search(
      "supporters",
      records,
      expertiseValue,
      searchValue,
      experienceValue
    );
    setRecords(filteredRecords);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    const filteredRecords = filterByExpertise(
      "supporters",
      records,
      expertiseValue,
      searchValue,
      experienceValue
    );

    setRecords(filteredRecords);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertiseValue]);

  useEffect(() => {
    const filteredRecords = filterByExperience(
      "supporters",
      records,
      expertiseValue,
      searchValue,
      experienceValue
    );
    setRecords(filteredRecords);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceValue]);

  return (
    <Box mb={20} mr={[5, 5, 18, 20, 20]} ml={[5, 5, 18, 20, 20]}>
      <Flex wrap="wrap" justify="center">
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
            placeholder="All areas of expertise"
            color="brand.blush"
            mr={[0, 0, 3, 12, 12]}
            mb={[5, 5, 0, 0, 0]}
            borderColor="brand.blush"
          >
            {expertiseOptions.map((expertise) => {
              return (
                <>
                  <option value={expertise} key={expertise}>
                    {expertise}
                  </option>
                </>
              );
            })}
          </Select>
          <Select
            value={experienceValue}
            onChange={handleExperienceChange}
            placeholder="All years of experience"
            color="brand.blush"
            mr={[0, 0, 3, 12, 12]}
            mb={[5, 5, 0, 0, 0]}
            borderColor="brand.blush"
          >
            {experienceOptions.map((experience) => {
              return (
                <>
                  <option value={experience} key={experience}>
                    {experience}
                  </option>
                </>
              );
            })}
          </Select>
          <Input
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search"
            color="brand.blush"
            borderColor="brand.blush"
          />
        </Flex>
        <Flex
          flexWrap="wrap"
          justify="space-between"
          width="100%"
          alignContent="space-between"
          height="600px"
          overflowY="scroll"
        >
          {records &&
            records.map((record, index) => {
              return <Card record={record} index={index} type="Supporters" />;
            })}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Supporters;
