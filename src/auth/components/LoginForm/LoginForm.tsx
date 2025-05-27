"use client";

import { Button, Container, PasswordInput, TextInput, Title, useMantineTheme } from '@mantine/core';
import Link from "next/link";
import { ArrowRight, BeakerIcon, Key, Mail } from 'lucide-react';
import { signIn } from "next-auth/react";
import { useForm } from '@mantine/form';

interface ILoginFormProps {
    variant?: "participant" | "researcher";
}

export default function LoginForm({ variant = "participant" }: ILoginFormProps) {
    const theme = useMantineTheme();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const credentialsAction = ({email, password}: any) => {
        signIn(variant, {
            username: email,
            email: email,
            password: password,
            redirectTo: variant === "participant" ? "/mail" : "/researcher/experiments",
        });
    };

    return (
        <Container size="xs" className="w-100 space-y-8">
            <div>
                    <div className="flex items-center justify-center">

                { variant === "researcher" ? (
                    <BeakerIcon className="h-12 w-12" color={theme.colors.blue[6]} />
                ) : (
                    <Mail className="h-12 w-12" color={theme.colors.blue[6]} />
                )}
                </div>

                <Title order={1} className="text-center text-3xl font-bold text-gray-900">
                    PhishingStressor
                </Title>
                <Title order={3} className="mt-6 text-center text-2xl font-medium text-gray-500">
                    { variant === "researcher" ? "Sign in as researcher" : "Sign in as participant" }
                </Title>
            </div>

            <form className="space-y-6" onSubmit={form.onSubmit(credentialsAction)}>
                <div className="space-y-4">
                    <TextInput
                        leftSection={<Mail size={16} />}
                        placeholder="Email address"
                        required
                        className="w-full"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        leftSection={<Key size={16} />}
                        placeholder="Password"
                        required
                        className="w-full"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    className="group flex justify-center"
                    rightSection={<ArrowRight size={16} />}
                >
                    Sign in
                </Button>
            </form>

            <div className="text-center">
                {variant === "participant" ? (
                    <Link
                        href="/researcher/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign in as Researcher
                    </Link>
                ) : (
                    <Link
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