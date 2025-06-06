import type {Metadata} from "next";
import { server } from '@/mocks';
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import {ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";

export const metadata: Metadata = {
    title: "PhishingStressor",
};


server.listen()

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript defaultColorScheme="light"/>
        </head>
        <body>
            <MantineProvider>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
            </MantineProvider>
        </body>
        </html>
    );
}