"use client";

import {
    Button,
    Container,
    Group,
    PasswordInput,
    Stack,
    TextInput,
    ThemeIcon,
    Title,
    useMantineTheme,
} from '@mantine/core';
import Link from "next/link";
import { ArrowLeft, ArrowRight, Beaker, Mail, RectangleEllipsis, User } from 'lucide-react';
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

    const credentialsAction = ({ username, password }: {
        username: string;
        password: string;
    }) => {
        signIn(variant, {
            username,
            password,
            redirectTo: variant === "participant" ? "/mail" : "/researcher/experiments",
        });
    };

    return (
        <Container size="md" className="w-100">
            <Stack gap="xs">
                <div className="flex items-center justify-center">
                <ThemeIcon size={60} variant='transparent'>
                { variant === "researcher" ? (
                    <Beaker size={60} />
                ) : (
                    <Mail size={60}/>
                )}
                </ThemeIcon>
                </div>

                <Title order={1} className="text-center text-3xl font-bold text-gray-900">
                    PhishingStressor
                </Title>
                <Title order={3} className="mt-6 text-center text-2xl font-medium text-gray-400">
                    { variant === "researcher" ? "Sign in as researcher" : "Sign in as participant" }
                </Title>
            

            <form onSubmit={form.onSubmit(credentialsAction)}>
                <Stack gap={"md"}>
                    <TextInput
                        leftSection={<User size={16} />}
                        placeholder="Username"
                        required
                        className="w-full"
                        key={form.key('username')}
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        leftSection={<RectangleEllipsis size={16} />}
                        placeholder="Password"
                        required
                        className="w-full"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />

                     <Button
                        type="submit"
                        fullWidth
                        rightSection={<ArrowRight size={16} />}
                        >
                        Sign in
                    </Button>
                </Stack>
            </form>

            <div className="text-center">
                {variant === "participant" ? (
                    <Button variant='subtle' rightSection={<ArrowRight size={18}/>} component={Link} href="/login/researcher">
                        Go to Researcher login
                    </Button>
                ) : (
                    <Group justify='space-between'>
                        <Button leftSection={<ArrowLeft size={18}/>} variant='subtle' component={Link} href="/login">
                            To participant login
                        </Button>
                        <Button rightSection={<ArrowRight size={18}/>} color={"gray"} variant='subtle' component={Link} href="/login/researcher/register">
                            Or register here
                        </Button>
                    </Group>
                )
            }   
            </div>
            </Stack>
        </Container>
    );
}