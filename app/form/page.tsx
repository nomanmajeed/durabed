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
} from "@mantine/core";
import useFormStore from "@/store/useFormStore";
import PanelFillingTable from "@/components/table/PanelFillingTable";
import {
  LABEL_TYPE_DATA,
  MATTRESS_ACCESSORIES_DATA,
  MATTRESS_BORDER_DATA,
  MATTRESS_PATTERN_NUMBER_DATA,
  MATTRESS_QUILT_TYPE_DATA,
  MATTRESS_SPRING_TYPE_DATA,
} from "@/constants/constants";

export default function Form() {
  const theme = useMantineTheme();
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
    submitForm,
  } = useFormStore();

  return (
    <Box my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
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
                  value={productName}
                  onChange={(e) => updateField("productName", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Product Details"
                  autosize
                  minRows={3}
                  maxRows={3}
                  value={productDetails}
                  onChange={(e) =>
                    updateField("productDetails", e.target.value)
                  }
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Delivery Address"
                  autosize
                  minRows={3}
                  maxRows={3}
                  value={deliveryAddress}
                  onChange={(e) =>
                    updateField("deliveryAddress", e.target.value)
                  }
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <TextInput
                  label="Tick Supplier"
                  placeholder="Original"
                  value={tickSupplier}
                  onChange={(e) => updateField("tickSupplier", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Quality"
                  placeholder="Knitted"
                  value={tickQuality}
                  onChange={(e) => updateField("tickQuality", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Number/Ref"
                  placeholder="12345"
                  value={tickNumberRef}
                  onChange={(e) => updateField("tickNumberRef", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Colour Ref"
                  placeholder="White"
                  value={tickColourRef}
                  onChange={(e) => updateField("tickColourRef", e.target.value)}
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
                  value={composition}
                  onChange={(e) => updateField("composition", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Issued To"
                  placeholder="John Doe"
                  value={issuedTo}
                  onChange={(e) => updateField("issuedTo", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Date Required"
                  placeholder="16/12/2021"
                  value={dateRequired}
                  onChange={(e) => updateField("dateRequired", e.target.value)}
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
                  value={comments}
                  onChange={(e) => updateField("comments", e.target.value)}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label="Label Type"
                  data={LABEL_TYPE_DATA}
                  searchable
                  value={labelType}
                  onChange={(values) => updateField("labelType", values)}
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
                  value={springType}
                  onChange={(values) => updateField("springType", values)}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label="Quilt Type"
                  data={MATTRESS_QUILT_TYPE_DATA}
                  searchable
                  value={quiltType}
                  onChange={(values) => updateField("quiltType", values)}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <MultiSelect
                  label="Accessories"
                  data={MATTRESS_ACCESSORIES_DATA}
                  searchable
                  value={accessories}
                  onChange={(values) => updateField("accessories", values)}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label="Pattern No."
                  data={MATTRESS_PATTERN_NUMBER_DATA}
                  searchable
                  value={patternNumber}
                  onChange={(values) => updateField("patternNumber", values)}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <MultiSelect
                  label="Border"
                  data={MATTRESS_BORDER_DATA}
                  searchable
                  value={borderType}
                  onChange={(values) => updateField("borderType", values)}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Border Depth"
                  placeholder="9.5 inches"
                  value={borderDepth}
                  onChange={(e) => updateField("borderDepth", e.target.value)}
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
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
