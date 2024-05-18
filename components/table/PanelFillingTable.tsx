"use-client";

import React from "react";
import {
  Table,
  ScrollArea,
  Box,
  Button,
  Text,
  Group,
  useMantineTheme,
} from "@mantine/core";

// Create interface
interface PanelFillingTableProps {
  title: string;
  data: {
    layer: string;
    description: string;
    weight: string;
    sizeWidth: string;
    supplier: string;
  }[];
}

const PanelFillingTable = ({ title, data }: PanelFillingTableProps) => {
  const theme = useMantineTheme();
  return (
    <Box
      style={{
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        border: `1px solid ${theme.colors.gray[3]}`,
      }}
    >
      <Box
        mb="xs"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text size="lg">{title}</Text>
        <Button variant="subtle" size="sm">
          + Add Layer
        </Button>
      </Box>
      <ScrollArea
        style={{
          minHeight: 100,
          maxHeight: 300,
        }}
      >
        <Table
          striped
          withColumnBorders
          style={{
            "thead tr th": {
              fontWeight: 500,
              fontSize: "13px",
              lineHeight: "20px",
              padding: "0.5rem 1.5rem",
              color: "#000",
            },
            "tbody tr": {
              cursor: "pointer",
              "&:hover td": {
                textDecoration: "underline",
              },
            },
            "tbody tr td": {
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "20px",
              padding: "0rem 1.5rem",
              borderTop: "none",
              borderBottom: "1px solid rgb(222, 226, 230)",
            },
            "td.no-padding": {
              padding: 0,
            },
            "th:not(.max), td:not(.max)": {
              width: 0,
              whiteSpace: "nowrap",
            },
          }}
          styles={{
            table: {
              borderCollapse: "collapse",
              width: "100%",
            },
            thead: {
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "#fff",
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Layer</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Weight</Table.Th>
              <Table.Th>Size/Width</Table.Th>
              <Table.Th>Supplier</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{item.layer}</Table.Td>
                <Table.Td>{item.description}</Table.Td>
                <Table.Td>{item.weight}</Table.Td>
                <Table.Td>{item.sizeWidth}</Table.Td>
                <Table.Td>{item.supplier}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
};

const PanelFillings = (tableData: PanelFillingTableProps) => {
  return (
    <Box my="lg">
      <PanelFillingTable title={tableData.title} data={tableData.data} />
    </Box>
  );
};

export default PanelFillings;
