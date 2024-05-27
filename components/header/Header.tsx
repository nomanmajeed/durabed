"use client";

import {
  Text,
  Group,
  Burger,
  rem,
  Container,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconBed } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { useState } from "react";
import Link from "next/link";

const links = [
  { link: "/", label: "Home" },
  { link: "/form", label: "Form" },
];

const Header = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link, index) => (
    <Link key={index} href={`${link.link}`}>
      <span
        className={classes.link}
        data-active={active === link.link || undefined}
        onClick={(event) => {
          setActive(link.link);
        }}
      >
        {link.label}
      </span>
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container px={0} size="97%" className={classes.inner}>
        <UnstyledButton
          style={{
            display: "flex",
            alignItems: "center",
            gap: rem(10),
          }}
        >
          <IconBed color={theme.colors.blue[6]} size="1.5rem" />
          <Text size={"1rem"}>Durabed</Text>
        </UnstyledButton>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={() => {
            setOpened(!opened);
          }}
          hiddenFrom="xs"
          size="sm"
        />
      </Container>
    </header>
  );
};

export default Header;
