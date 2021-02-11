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

function Talent({ base, experienceOptions, expertiseOptions }) {
  const allRecords = [];
  const [records, setRecords] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);

  const [expertiseValue, setExpertiseValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const perPage = 10;
  const [lastScrollPosition, setLastScrollPosition] = useState(perPage);

  const loadCards = () => {
    if (records.length) {
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
            "talent",
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
    }
    console.log("load cards called");
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
    base("Amplify POC Talent Gallery: Live")
      .select({
        sort: [
          { field: "Years of Experience", direction: "desc" },
          { field: "Name", direction: "asc" },
        ],
        view: "Grid view",
      })
      .eachPage(processPage, processRecords);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredRecords = search(
      "talent",
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
      "talent",
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
      "talent",
      records,
      expertiseValue,
      searchValue,
      experienceValue
    );
    setRecords(filteredRecords);
    console.log("filtered records set");
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
                return <Card record={record} index={index} type="Talent" />;
              })}
          </Flex>
        </InfiniteScroll>
      </Flex>
    </Box>
  );
}

export default Talent;
