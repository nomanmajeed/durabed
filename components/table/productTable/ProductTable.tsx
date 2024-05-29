"use client";

import { useState, useEffect } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  useMantineTheme,
  Box,
  Loader,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./ProductTable.module.css";
import { deleteProduct, getProducts } from "@/actions/product.actions";
import { NotFoundTitle } from "@/components/NotFound/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RowData {
  id: number;
  productName: string;
  productDetails: string;
  deliveryAddress: string;
  tickSupplier: string;
  tickQuality: string;
  tickNumberRef: string;
  tickColourRef: string;
  composition: string;
  issuedTo: string;
  dateRequired: string;
  comments: string;
  labelType: string[];
  springType: string[];
  quiltType: string[];
  accessories: string[];
  patternNumber: string[];
  borderType: string[];
  borderDepth: string;
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
  return data.filter(({ id, ...item }) =>
    (Object.keys(item) as (keyof typeof item)[]).some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(query);
      } else if (Array.isArray(value)) {
        return value.some((v) => v.toLowerCase().includes(query));
      }
      return false;
    })
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
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return payload.reversed
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return payload.reversed ? bValue - aValue : aValue - bValue;
      }

      return 0; // Handle cases where the types are mixed or arrays
    }),
    payload.search
  );
}

export function ProductTable() {
  const theme = useMantineTheme();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<RowData[]>([]);
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const result: any = await getProducts();
      if (result) {
        setData(result);
        setSortedData(result);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <Table.Td>{row.tickColourRef}</Table.Td>
      <Table.Td>{row.issuedTo}</Table.Td>
      <Table.Td>{row.dateRequired}</Table.Td>
      <Table.Td>
        <Group>
          <UnstyledButton>
            <Text color={theme.colors.blue[6]}>Edit</Text>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => {
              console.log("Delete product", row.id);
              deleteProduct(row.id);
              fetchData();
              toast.success(`Product ${row.productName} deleted successfully`);
            }}
          >
            <Text color={theme.colors.red[6]}>Delete</Text>
          </UnstyledButton>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  //   if (loading) {
  //     return (
  //       <Box
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Loader color="blue" size="sm" />
  //       </Box>
  //     );
  //   }

  if (error) {
    return <NotFoundTitle />;
  }

  return (
    <>
      <ToastContainer />

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
          ml="sm"
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
          striped={"even"}
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
                sorted={sortBy === "tickColourRef"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("tickColourRef")}
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
                <Table.Td
                  colSpan={data.length > 0 ? Object.keys(data[0]).length : 12}
                >
                  <Text fw={500} ta="center" mt="xl">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
