import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import Card from "../components/Card";
import { matchSorter } from "match-sorter";
import { Flex, Input } from "@chakra-ui/react";
import ReactGA from "react-ga";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    ReactGA.event({
      category: "Search",
      action: value,
      label: "Search all records",
    });
  }, 200);

  return (
    <Input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder="Search"
      color="brand.blush"
      borderColor="brand.blush"
      aria-label="Search"
    />
  );
}

function DefaultColumnFilter() {
  return "";
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function DataTable({ columns, data, type }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  return (
    <>
      <table {...getTableProps()}>
        <Flex
          mt={10}
          justify="space-between"
          direction={["column", "column", "row", "row"]}
          align={["center", "center", "normal", "normal"]}
          width="100%"
          mb={10}
        >
          {headerGroups.map((headerGroup, i) =>
            headerGroup.headers.map((column) =>
              column.canFilter ? column.render("Filter") : null
            )
          )}
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Flex>

        <Flex
          {...getTableBodyProps()}
          flexWrap="wrap"
          justify="space-between"
          width="100%"
          alignContent="space-between"
          height="600px"
          overflowY="scroll"
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Card row={row} key={i} type={type} {...row.getRowProps()} />
            );
          })}
        </Flex>
      </table>
    </>
  );
}
export default DataTable;
