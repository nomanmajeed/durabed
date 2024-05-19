"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Box,
  Button,
  Text,
  TextInput,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useFormStore, { IFormStore, IPanelFilling } from "@/store/useFormStore";

interface PanelFillingTableProps {
  title: string;
  data: IPanelFilling[];
  formField: keyof IFormStore;
}

const PanelFillingTable: React.FC<PanelFillingTableProps> = ({
  title,
  data,
  formField,
}) => {
  const theme = useMantineTheme();
  const updatePanelFilling = useFormStore((state) => state.updatePanelFilling);

  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm({
    initialValues: {
      layer: "",
      description: "",
      weight: 0,
      sizeWidth: 0,
      supplier: "",
    },
    validate: {
      layer: (value) => (value ? null : "Layer is required"),
      description: (value) => (value ? null : "Description is required"),
      weight: (value) =>
        value && !isNaN(Number(value)) ? null : "Weight must be a number",
      sizeWidth: (value) =>
        value && !isNaN(Number(value)) ? null : "Size/Width must be a number",
      supplier: (value) => (value ? null : "Supplier is required"),
    },
  });

  const handleAddLayer = (values: typeof form.values) => {
    updatePanelFilling(formField, [...data, values]);
    form.reset();
    setModalOpened(false); // Close the modal after adding the layer
  };

  useEffect(() => {
    if (modalOpened) {
      form.setFieldValue("layer", `Layer ${data.length + 1}`);
    }
  }, [modalOpened, data.length, form]);

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
        <Button variant="subtle" size="sm" onClick={() => setModalOpened(true)}>
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

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Add New Layer"
      >
        <form onSubmit={form.onSubmit(handleAddLayer)}>
          <TextInput
            placeholder="Layer"
            disabled
            {...form.getInputProps("layer")}
            mb="xs"
          />
          <TextInput
            placeholder="Description"
            {...form.getInputProps("description")}
            mb="xs"
          />
          <TextInput
            placeholder="Weight"
            {...form.getInputProps("weight")}
            mb="xs"
          />
          <TextInput
            placeholder="Size/Width"
            {...form.getInputProps("sizeWidth")}
            mb="xs"
          />
          <TextInput
            placeholder="Supplier"
            {...form.getInputProps("supplier")}
            mb="xs"
          />
          <Button type="submit">Add Layer</Button>
        </form>
      </Modal>
    </Box>
  );
};

export default PanelFillingTable;
