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
} from '@mantine/core';
import Link from "next/link";
import { ArrowLeft, ArrowRight, Beaker, Mail, RectangleEllipsis, User } from 'lucide-react';
import { signIn } from "next-auth/react";
import { useForm } from '@mantine/form';

interface ILoginFormProps {
    variant?: "participant" | "researcher";
    canRegister?: boolean;
}

export default function LoginForm({ variant = "participant", canRegister=false }: ILoginFormProps) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
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
                <ThemeIcon size={69} variant='transparent'>
                    { variant === "researcher" ? (
                        <Beaker size={69} />
                    ) : (
                        <Mail size={69}/>
                    )}
                </ThemeIcon>
            </div>

            <Title order={1} className="text-center text-3xl font-bold text-gray-900">
                PhishingStressor
            </Title>
            <Title order={4} className="text-center text-2xl font-medium text-gray-400">
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
                    <Group justify={canRegister ? 'space-between' : 'center'}>
                        <Button leftSection={<ArrowLeft size={18}/>} variant='subtle' component={Link} href="/login">
                            To participant login
                        </Button>
                        {canRegister && 
                            <Button rightSection={<ArrowRight size={18}/>} color={"gray"} variant='subtle' component={Link} href="/login/researcher/register">
                                Or register here
                            </Button>
                        }
                    </Group>
                )
            }   
            </div>
        </Stack>
    </Container>
    );
}