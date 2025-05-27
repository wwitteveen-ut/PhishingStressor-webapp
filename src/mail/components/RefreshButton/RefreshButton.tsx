"use client";

import { ActionIcon, Affix } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RotateCw } from "lucide-react";

export default function RefreshButton() {
    const [loading, { toggle }] = useDisclosure();

    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <ActionIcon size="xl" loading={loading} onClick={toggle}>
                <RotateCw/>
            </ActionIcon>
        </Affix>
    );
}