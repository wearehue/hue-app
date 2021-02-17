import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Card from "../components/Card";
import { filterByExperience, filterByExpertise, search } from "../utils/filter";
import FilterBar from "../components/FilterBar";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

function Supporters({ base, title }) {
  const allRecords = [];
  const [records, setRecords] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const location = useLocation();

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
    ReactGA.event({
      category: "Filtering",
      action: event.target.value,
      label: "Filter by experience",
    });
  };

  const handleExpertiseChange = (event) => {
    setRecords(initialRecords);
    setExpertiseValue(event.target.value);
    ReactGA.event({
      category: "Filtering",
      action: event.target.value,
      label: "Filter by expertise",
    });
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

    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
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
        <FilterBar
          expertiseValue={expertiseValue}
          handleExpertiseChange={handleExpertiseChange}
          expertiseOptions={expertiseOptions}
          experienceValue={experienceValue}
          handleExperienceChange={handleExperienceChange}
          experienceOptions={experienceOptions}
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
        />
        <Flex
          flexWrap="wrap"
          justify="space-between"
          width="100%"
          alignContent="space-between"
          height="600px"
          overflowY="scroll"
        >
          {records &&
            records.map((record) => {
              return <Card record={record} type="Supporters" />;
            })}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Supporters;
