import React, { useState, useEffect } from "react";
import { Box, Flex, Select } from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

function Supporters({ base, title }) {
  const allRecords = [];
  const [records, setRecords] = useState([]);
  const location = useLocation();

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
    setRecords(allRecords);
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

  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const displayId = id.slice(7);

    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        row.values[id]?.forEach((option) => options.add(option));
      });
      const optionsArr = [...options.values()];
      if (displayId === "Years of Marketing Experience") {
        return optionsArr.sort((a, b) => {
          let returnVal = null;
          if (a.length < 6 && b.length < 6) {
            const numA = Number.parseInt(a);
            const numB = Number.parseInt(b);
            returnVal = numB - numA;
          }
          if (a.length > 6) {
            returnVal = 1;
          }
          if (b.length > 6) {
            returnVal = -1;
          }
          return returnVal;
        });
      } else {
        return optionsArr.sort((a, b) => a.localeCompare(b));
      }
    }, [id, preFilteredRows, displayId]);

    return (
      <Select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
          ReactGA.event({
            category: "Filtering",
            action: e.target.value,
            label: `Filter by ${displayId}`,
          });
        }}
        color="brand.blush"
        mr={[0, 0, 3, 12, 12]}
        mb={[5, 5, 0, 0, 0]}
        borderColor="brand.blush"
        aria-label={`Filter by ${displayId}`}
      >
        <option value="" style={{ color: "black" }}>
          {displayId === "Expertise"
            ? `All Areas of ${displayId}`
            : `All ${displayId}`}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option} style={{ color: "black" }}>
            {option}
          </option>
        ))}
      </Select>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Record",
        accessor: "fields",
        columns: [
          {
            Header: "Name",
            accessor: "fields.Name",
          },
          {
            Header: "Expertise",
            accessor: "fields.Expertise",
            Filter: SelectColumnFilter,
          },
          {
            Header: "Short Bio",
            accessor: "fields.Short Bio",
          },
          {
            Header: "Years of Experience",
            accessor: "fields.Years of Marketing Experience",
            Filter: SelectColumnFilter,
          },
          {
            Header: "Where I've Worked",
            accessor: "fields.Where I've Worked",
          },
          {
            Header: "Location",
            accessor: "fields.Location",
          },
          {
            Header: "LinkedIn",
            accessor: "fields.LinkedIn",
          },
          {
            Header: "How I'd Like to Help",
            accessor: "fields.How I'd Like to Help",
          },
        ],
      },
    ],
    []
  );

  return (
    <Box mb={20} mr={[5, 5, 18, 20, 20]} ml={[5, 5, 18, 20, 20]}>
      <Flex wrap="wrap" justify="center">
        <DataTable columns={columns} data={records} type="supporters" />
      </Flex>
    </Box>
  );
}

export default Supporters;
