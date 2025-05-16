"use client";

import LoginForm from "@/auth/components/LoginForm/LoginForm";
import { Center } from "@mantine/core";
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
        <Center h={"100vh"}>
            <LoginForm variant="researcher"/>
        </Center>
    );
}
