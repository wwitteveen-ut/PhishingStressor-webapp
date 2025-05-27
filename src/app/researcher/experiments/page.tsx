"use client";

import LoginForm from "@/auth/components/LoginForm/LoginForm";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { Button, Center } from "@mantine/core";
import Link from "next/link";

export default function Login() {
    return (
        <>
            <Center flex={1}>
                <ResearcherSidebar />
                <Button component={Link} href="/researcher/experiments/1">
                    Go to Experiment 1
                </Button>
            </Center>
        </>
    );
}
