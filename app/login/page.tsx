"use client";

import {Button, Input} from "@mantine/core";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Login() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("http://145.126.3.17:3000/api/users");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
            } catch (err: any) {
                setError(err.message);
            }
        };

        getData();
    }, []);


    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-center text-3xl font-bold text-gray-900">
                PhishingStressor
            </h1>
            <Input placeholder="Email address" />
            <Input placeholder="Password" />
            <Button component={Link} href={"/"}>
                Login
            </Button>
        </div>
    );
}
