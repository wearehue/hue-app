import React, { useState, useEffect } from "react";
import { Box, Flex, Input, Select } from "@chakra-ui/react";
import Card from "../components/Card";
import {
  filterByExperience,
  filterByExpertise,
  search,
  filterNewRecords,
} from "../utils/filter";
import InfiniteScroll from "react-infinite-scroll-component";

function Supporters({ base, experienceOptions, expertiseOptions }) {
  const allRecords = [];
  const [records, setRecords] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);

  const [expertiseValue, setExpertiseValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const perPage = 10;
  const [lastScrollPosition, setLastScrollPosition] = useState(perPage);

  const loadCards = () => {
    setTimeout(() => {
      setRecords((currentRecords) => {
        const nextRecords = [
          ...currentRecords,
          ...initialRecords.slice(
            lastScrollPosition,
            lastScrollPosition + perPage
          ),
        ];
        return filterNewRecords(
          "supporters",
          nextRecords,
          expertiseValue,
          searchValue,
          experienceValue
        );
      });
    }, 1000);

    setLastScrollPosition((currentValue) => {
      return currentValue + perPage;
    });
  };

  const handleSearchChange = (event) => {
    setRecords(initialRecords.slice(0, lastScrollPosition));
    setSearchValue(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setRecords(initialRecords.slice(0, lastScrollPosition));
    setExperienceValue(event.target.value);
  };

  const handleExpertiseChange = (event) => {
    setRecords(initialRecords.slice(0, lastScrollPosition));
    setExpertiseValue(event.target.value);
  };

  const processPage = (nextRecords, fetchNextPage) => {
    allRecords.push(...nextRecords);
    fetchNextPage();
  };

  const processRecords = (err) => {
    if (err) {
      console.error(err);
      return;
    }

    setInitialRecords(allRecords);
    setRecords(allRecords.slice(0, perPage));
  };
  useEffect(() => {
    base("Support POC Supporter Gallery: Live")
      .select({
        sort: [
          { field: "Expertise", direction: "asc" },
          { field: "Years of Marketing Experience", direction: "desc" },
        ],
        view: "Grid view",
      })
      .eachPage(processPage, processRecords);
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
    <Box mt={10} mb={20} mr={[5, 5, 18, 20, 20]} ml={[5, 5, 18, 20, 20]}>
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
            mr={[0, 0, 3, 8, 8]}
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
            mr={[0, 0, 3, 8, 8]}
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

        <InfiniteScroll
          dataLength={records.length}
          next={loadCards}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <Flex
            flexWrap="wrap"
            justify="space-between"
            width="100%"
            alignContent="space-between"
          >
            {records &&
              records.map((record, index) => {
                return <Card record={record} index={index} type="Supporters" />;
              })}
          </Flex>
        </InfiniteScroll>
      </Flex>
    </Box>
  );
}

export default Supporters;
