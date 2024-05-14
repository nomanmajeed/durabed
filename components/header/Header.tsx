"use client";

import {
  Autocomplete,
  Group,
  Burger,
  rem,
  Container,
  Box,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

const links = [
  { link: "/", label: "Home" },
  { link: "/form", label: "Form" },
];

const Header = () => {
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
        <MantineLogo size={28} />
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
