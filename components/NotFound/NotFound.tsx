import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./NotFound.module.css";

export function NotFoundTitle() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Failed to load products.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        We are sorry, but something went wrong. Please try again later.
      </Text>
    </Container>
  );
}
