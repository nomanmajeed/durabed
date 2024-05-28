"use client";

import { ReactNode, useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  useMantineTheme,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./ProductTable.module.css";

interface RowData {
  productName: string;
  tickSupplier: string;
  tickQuality: string;
  tickNumberRef: string;
  tickColorRef: string;
  issuedTo: string;
  dateRequired: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          {children !== "Actions" && (
            <Center className={classes.icon}>
              <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
  {
    productName: "Athena Weissnat",
    tickSupplier: "Little - Rippin",
    tickQuality: "Handcrafted",
    tickNumberRef: "Elouise.Prohaska@yahoo.com",
    tickColorRef: "No Label",
    issuedTo: "Centre",
    dateRequired: "23/12/2021",
  },
];

export function ProductTable() {
  const theme = useMantineTheme();
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.productName}>
      <Table.Td>{row.productName}</Table.Td>
      <Table.Td>{row.tickSupplier}</Table.Td>
      <Table.Td>{row.tickQuality}</Table.Td>
      <Table.Td>{row.tickNumberRef}</Table.Td>
      <Table.Td>{row.tickColorRef}</Table.Td>
      <Table.Td>{row.issuedTo}</Table.Td>
      <Table.Td>{row.dateRequired}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      style={{
        padding: rem(30),
        border: "1px solid " + theme.colors.gray[4],
        borderRadius: rem(30),
        height: "calc(100vh - 120px)",
      }}
    >
      <TextInput
        placeholder="Search by any field"
        w={"30%"}
        mb="md"
        ml="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
        striped={"even"}
        highlightOnHover
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "productName"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("productName")}
            >
              Product Name
            </Th>
            <Th
              sorted={sortBy === "tickSupplier"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("tickSupplier")}
            >
              Tick Supplier
            </Th>
            <Th
              sorted={sortBy === "tickQuality"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("tickQuality")}
            >
              Tick Quality
            </Th>
            <Th
              sorted={sortBy === "tickNumberRef"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("tickNumberRef")}
            >
              Tick Number Ref
            </Th>
            <Th
              sorted={sortBy === "tickColorRef"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("tickColorRef")}
            >
              Tick Color Ref
            </Th>
            <Th
              sorted={sortBy === "issuedTo"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("issuedTo")}
            >
              Issued To
            </Th>
            <Th
              sorted={sortBy === "dateRequired"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("dateRequired")}
            >
              Date Required
            </Th>
            <Th>Actions</Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
