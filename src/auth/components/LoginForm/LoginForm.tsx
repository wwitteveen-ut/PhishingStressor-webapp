"use client";

import { Button, Container, PasswordInput, TextInput, Title, useMantineTheme } from '@mantine/core';
import Link from "next/link";
import { ArrowLeft, ArrowRight, BeakerIcon, Key, Mail } from 'lucide-react';
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
            username: '',
            password: '',
        },
        validate: {
            username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const credentialsAction = ({username, password}: {
        username: string,
        password: string
    }) => {
        signIn(variant, {
            username: username,
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
                        key={form.key('username')}
                        {...form.getInputProps('username')}
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
                    <Button variant='subtle' rightSection={<ArrowRight size={18}/>} component={Link} href="/researcher/login">
                        Go to Researcher login
                    </Button>
                ) : (
                    <Button leftSection={<ArrowLeft size={18}/>} variant='subtle' component={Link} href="/login">
                         Back to participant login
                    </Button>
                )
            }   
            </div>
        </Container>
    );
}