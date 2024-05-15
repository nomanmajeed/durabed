"use client";

import {
  Fieldset,
  Grid,
  MultiSelect,
  SimpleGrid,
  TextInput,
  Textarea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Form() {
  const theme = useMantineTheme();

  const LABEL_TYPE_DATA = [
    "Dura Beds",
    "Own Label",
    "No Label",
    "Centre",
    "Corner",
    "Tag Label",
    "Ortho",
    "Pocket",
    "Twin Spring",
    "Other",
  ];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                  key={form.key("productName")}
                  {...form.getInputProps("productName")}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Product Details"
                  autosize
                  minRows={3}
                  maxRows={3}
                  key={form.key("productDetails")}
                  {...form.getInputProps("productDetails")}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Delivery Address"
                  autosize
                  minRows={3}
                  maxRows={3}
                  key={form.key("deliveryAddress")}
                  {...form.getInputProps("deliveryAddress")}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col>
                <TextInput
                  label="Tick Supplier"
                  placeholder="Original"
                  key={form.key("tickSupplier")}
                  {...form.getInputProps("tickSupplier")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Quality"
                  placeholder="Knitted"
                  key={form.key("tickQuality")}
                  {...form.getInputProps("tickQuality")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Number/Ref"
                  placeholder="12345"
                  key={form.key("tickNumberRef")}
                  {...form.getInputProps("tickNumberRef")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Tick Colour Ref"
                  placeholder="White"
                  key={form.key("tickColourRef")}
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
                  key={form.key("composition")}
                  {...form.getInputProps("composition")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Issued To"
                  placeholder="John Doe"
                  key={form.key("issuedTo")}
                  {...form.getInputProps("issuedTo")}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label="Date Required"
                  placeholder="16/12/2021"
                  key={form.key("dateRequired")}
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
                  key={form.key("comments")}
                  {...form.getInputProps("comments")}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label="Label Type"
                  data={LABEL_TYPE_DATA}
                  searchable
                  key={form.key("labelType")}
                  {...form.getInputProps("labelType")}
                />
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </Fieldset>
      </form>
    </div>
  );
}
