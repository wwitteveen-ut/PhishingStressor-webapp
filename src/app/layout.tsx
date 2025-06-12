import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import type { Metadata } from "next";
import "./globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  title: "PhishingStressor",
};

// server.listen();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="icon" href="/icon.svg" sizes="any" />
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider>
          <Notifications limit={5} autoClose={2000} />
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
