import {Button, Input} from "@mantine/core";
import Link from "next/link";

export default function Login() {
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
