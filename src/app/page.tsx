"use client";

import { Button } from "@mantine/core";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";

export default function Home() {
    return permanentRedirect("/login");
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Button component={Link} href={"/login"}>
                Click here
            </Button>
        </div>
    );
}
