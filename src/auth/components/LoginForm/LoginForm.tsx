"use client";

import { Button, Container, PasswordInput, TextInput, Title } from '@mantine/core';
import Link from "next/link";
import { ArrowRight, Key, Mail } from 'lucide-react';

interface ILoginFormProps {
    variant?: "participant" | "researcher";
}

export default function LoginForm({
    variant = "participant",
}: ILoginFormProps) {
    return (
        <Container size="xs" className="w-100 space-y-8">
            <div>
                <Title order={1} className="text-center text-3xl font-bold text-gray-900">
                    PhishingStressor
                </Title>
                <Title order={3} className="mt-6 text-center text-2xl font-medium text-gray-500">
                    Sign in to your account
                </Title>
            </div>

            <form className="space-y-6">
                <div className="space-y-4">
                    <TextInput
                        leftSection={<Mail size={16} />}
                        placeholder="Email address"
                        required
                        className="w-full"
                    />
                    <PasswordInput
                        leftSection={<Key size={16} />}
                        placeholder="Password"
                        required
                        className="w-full"
                    />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    className="group flex justify-center"
                    rightSection={<ArrowRight size={16} />}
                >
                    Sign in { variant === "researcher" && "as researcher"}
                </Button>
            </form>

            <div className="text-center">
                { variant === "participant" ? 
                (<Link
                    href="/researcher/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Sign in as Experimenter
                </Link>) : 
                (<Link
                    href="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Back to participant login
                </Link>) 
            }
                
            </div>
        </Container>
    );
}