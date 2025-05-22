import type {Metadata} from "next";
import { server } from '@/mocks/server';
import "./globals.css";
import '@mantine/core/styles.css';

import {ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';

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
            <ColorSchemeScript/>
        </head>
        <body>
            <MantineProvider>{children}</MantineProvider>
        </body>
        </html>
    );
}