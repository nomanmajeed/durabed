/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Box,
  Button,
  Fieldset,
  Grid,
  MultiSelect,
  SimpleGrid,
  TextInput,
  Textarea,
  rem,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import useFormStore, { IFormStore } from "@/store/useFormStore";
import PanelFillingTable from "@/components/table/PanelFillingTable";
import {
  LABEL_TYPE_DATA,
  MATTRESS_ACCESSORIES_DATA,
  MATTRESS_BORDER_DATA,
  MATTRESS_PATTERN_NUMBER_DATA,
  MATTRESS_QUILT_TYPE_DATA,
  MATTRESS_SPRING_TYPE_DATA,
} from "@/constants/constants";

import {
  createProduct,
  getProduct,
  updateProduct,
} from "@/actions/product.actions";
import { useEffect, useState, Suspense } from "react";
import { showNotification } from "@mantine/notifications";

function FormComponent() {
  const theme = useMantineTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(false);

  const {
    productName,
    productDetails,
    deliveryAddress,
    tickSupplier,
    tickQuality,
    tickNumberRef,
    tickColourRef,
    composition,
    issuedTo,
    dateRequired,
    comments,
    labelType,
    springType,
    quiltType,
    accessories,
    patternNumber,
    borderType,
    borderDepth,
    panelFillingTopLayer,
    panelFillingBottomLayer,
    borderFilling,
    updateField,
  } = useFormStore();

  const form = useForm({
    initialValues: {
      productName,
      productDetails,
      deliveryAddress,
      tickSupplier,
      tickQuality,
      tickNumberRef,
      tickColourRef,
      composition,
      issuedTo,
      dateRequired,
      comments,
      labelType,
      springType,
      quiltType,
      accessories,
      patternNumber,
      borderType,
      borderDepth,
    },
    validate: {
      productName: (value) => (value ? null : "Product Name is required"),
      productDetails: (value) =>
        value ? null : "Product Details are required",
      deliveryAddress: (value) =>
        value ? null : "Delivery Address is required",
      tickSupplier: (value) => (value ? null : "Tick Supplier is required"),
      tickQuality: (value) => (value ? null : "Tick Quality is required"),
      tickNumberRef: (value) => (value ? null : "Tick Number/Ref is required"),
      tickColourRef: (value) => (value ? null : "Tick Colour Ref is required"),
      composition: (value) => (value ? null : "Composition is required"),
      issuedTo: (value) => (value ? null : "Issued To is required"),
      dateRequired: (value) =>
        !value
          ? "Date is required"
          : !/^\d{2}\/\d{2}\/\d{4}$/.test(value)
          ? "Date must be in the format DD/MM/YYYY"
          : null,
      comments: (value) => (value ? null : "Comments are required"),
      labelType: (value) => (value.length ? null : "Label Type is required"),
      springType: (value) => (value.length ? null : "Spring Type is required"),
      quiltType: (value) => (value.length ? null : "Quilt Type is required"),
      accessories: (value) =>
        value.length ? null : "Accessories are required",
      patternNumber: (value) =>
        value.length ? null : "Pattern Number is required",
      borderType: (value) => (value.length ? null : "Border Type is required"),
      borderDepth: (value) => (value ? null : "Border Depth is required"),
    },
  });

  useEffect(() => {
    if (id) {
      setLoading(true); // Start loading
      const productId = Number(id);

      const fetchProduct = async () => {
        try {
          const productDetails = await getProduct(productId);

          if (productDetails) {
            form.setValues({
              productName: productDetails.productName || "",
              productDetails: productDetails.productDetails || "",
              deliveryAddress: productDetails.deliveryAddress || "",
              tickSupplier: productDetails.tickSupplier || "",
              tickQuality: productDetails.tickQuality || "",
              tickNumberRef: productDetails.tickNumberRef || "",
              tickColourRef: productDetails.tickColourRef || "",
              composition: productDetails.composition || "",
              issuedTo: productDetails.issuedTo || "",
              dateRequired: productDetails.dateRequired || "",
              comments: productDetails.comments || "",
              labelType: productDetails.labelType || [],
              springType: productDetails.springType || [],
              quiltType: productDetails.quiltType || [],
              accessories: productDetails.accessories || [],
              patternNumber: productDetails.patternNumber || [],
              borderType: productDetails.borderType || [],
              borderDepth: productDetails.borderDepth || "",
            });
            // Update panel fillings data in the store
            updateField(
              "panelFillingTopLayer",
              productDetails.topPanelFillings
            );
            updateField(
              "panelFillingBottomLayer",
              productDetails.bottomPanelFillings
            );
            updateField("borderFilling", productDetails.borderPanelFillings);
          } else {
            showNotification({
              title: "Error",
              message: "Product not found.",
              color: "red",
            });
          }

          setLoading(false); // End loading
        } catch (error) {
          console.error("Failed to fetch product details:", error);
          showNotification({
            title: "Error",
            message: "Failed to fetch product details.",
            color: "red",
          });
          setLoading(false); // End loading
        }
      };

      fetchProduct();
    }
  }, [id]);

  const submitForm = async (data: IFormStore) => {
    try {
      if (id) {
        await updateProduct(Number(id), {
          ...data,
          panelFillingTopLayer,
          panelFillingBottomLayer,
          borderFilling,
        });
        showNotification({
          title: "Success",
          message: "Product updated successfully!",
          color: "green",
        });
      } else {
        await createProduct({
          ...data,
          panelFillingTopLayer,
          panelFillingBottomLayer,
          borderFilling,
        });
        showNotification({
          title: "Success",
          message: "Product created successfully!",
          color: "green",
        });
      }
      router.push("/"); // Navigate to the homepage on success
    } catch (error) {
      console.error(`Failed to ${id ? "update" : "create"} product:`, error);
      showNotification({
        title: "Error",
        message: `Failed to ${id ? "update" : "create"} product.`,
        color: "red",
      });
    }
  };

  const handleSubmit = (values: any) => {
    // Ensure this logic only runs for the main form submission
    if (
      !panelFillingTopLayer.length &&
      !panelFillingBottomLayer.length &&
      !borderFilling.length
    ) {
      alert("Panel filling layers data must not be empty");
      return; // Prevent form submission
    }

    // Update store fields with validated form values
    (Object.keys(values) as (keyof IFormStore)[]).forEach((key) =>
      updateField(key, values[key])
    );
    submitForm(values);
  };

  return (
    <Box my="md">
      <LoadingOverlay visible={loading} />
      <form
        onSubmit={(event) => {
          event.preventDefault(); // Prevent the default form submission
          form.onSubmit(handleSubmit)(event);
        }}
      >
        <Fieldset
          legend="Product information"
          style={{
            backgroundColor: theme.colors.gray[0],
            padding: rem(20),
            borderRadius: rem(10),
          }}
        >
          <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="xl" mx={"xl"}>
            <Grid gutter="md">
              <Grid.Col>
                <TextInput
                  label="Product Name"
                  placeholder="Crystal"
                  {...form.getInputProps("productName")}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Product Details"
                  autosize
                  minRows={3}
                  maxRows={3}
                  {...form.getInputProps("productDetails")}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Delivery Address"
                  autosize
                  minRows={3}
                  maxRows={3}
                  {...form.getInputProps("deliveryAddress")}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <TextInput
                  label="Tick Supplier"
                  placeholder="Original"
                  {...form.getInputProps("tickSupplier")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Quality"
                  placeholder="Knitted"
                  {...form.getInputProps("tickQuality")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Number/Ref"
                  placeholder="12345"
                  {...form.getInputProps("tickNumberRef")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Colour Ref"
                  placeholder="White"
                  {...form.getInputProps("tickColourRef")}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <Textarea
                  label="Composition"
                  autosize
                  minRows={4}
                  maxRows={4}
                  {...form.getInputProps("composition")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Issued To"
                  placeholder="John Doe"
                  {...form.getInputProps("issuedTo")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Date Required"
                  placeholder="16/12/2021"
                  {...form.getInputProps("dateRequired")}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <Textarea
                  label="Comments"
                  autosize
                  minRows={6}
                  maxRows={6}
                  {...form.getInputProps("comments")}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label="Label Type"
                  data={LABEL_TYPE_DATA}
                  searchable
                  {...form.getInputProps("labelType")}
                />
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </Fieldset>

        <Fieldset
          my="md"
          legend="Mattress"
          style={{
            backgroundColor: theme.colors.gray[0],
            padding: rem(20),
            borderRadius: rem(10),
          }}
        >
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mx={"xl"}>
            <Grid gutter="md">
              <Grid.Col>
                <MultiSelect
                  label="Spring Type"
                  data={MATTRESS_SPRING_TYPE_DATA}
                  searchable
                  {...form.getInputProps("springType")}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label="Quilt Type"
                  data={MATTRESS_QUILT_TYPE_DATA}
                  searchable
                  {...form.getInputProps("quiltType")}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <MultiSelect
                  label="Accessories"
                  data={MATTRESS_ACCESSORIES_DATA}
                  searchable
                  {...form.getInputProps("accessories")}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label="Pattern No."
                  data={MATTRESS_PATTERN_NUMBER_DATA}
                  searchable
                  {...form.getInputProps("patternNumber")}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <MultiSelect
                  label="Border"
                  data={MATTRESS_BORDER_DATA}
                  searchable
                  {...form.getInputProps("borderType")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Border Depth"
                  placeholder="9.5 inches"
                  {...form.getInputProps("borderDepth")}
                />
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </Fieldset>

        <PanelFillingTable
          title="PANEL FILLINGS (Tick Downwards)"
          data={panelFillingTopLayer}
          formField="panelFillingTopLayer"
        />

        <PanelFillingTable
          title="PANEL FILLINGS SECOND SIDE (Tick Downwards)"
          data={panelFillingBottomLayer}
          formField="panelFillingBottomLayer"
        />

        <PanelFillingTable
          title="BORDER FILLINGS"
          data={borderFilling}
          formField="borderFilling"
        />

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: rem(20),
          }}
        >
          <Button variant="subtle" size="sm" type="submit">
            {id ? "Update" : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default function Form() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormComponent />
    </Suspense>
  );
}
