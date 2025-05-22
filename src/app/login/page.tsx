"use client";

import LoginForm from "@/auth/components/LoginForm/LoginForm";
import { Center } from "@mantine/core";

export default function Login() {

    return (
        <Center h={"100vh"}>
            <LoginForm/>
        </Center>
    );
}
