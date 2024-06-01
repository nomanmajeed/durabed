import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { Box, ColorSchemeScript, MantineProvider } from "@mantine/core";
import Header from "@/components/header/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Durabed",
  description: "Bedding furniture store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <Header />
          <Box mx="xl">{children}</Box>
        </MantineProvider>
      </body>
    </html>
  );
}
