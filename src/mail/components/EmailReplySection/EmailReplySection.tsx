"use client";

import { useState } from "react";
import { Button, Container } from "@mantine/core";
import EmailComposer from "../EmailComposer/EmailComposer";
import { ReplyIcon } from "lucide-react";

export default function EmailReplySection() {
    const [isReplying, setIsReplying] = useState(false);


    return (
        <Container fluid p={0}>
            {isReplying ? (
                <EmailComposer replyTo={{subject: "hello"}}/>
            ) : (
                <Button onClick={() => setIsReplying(true)} rightSection={<ReplyIcon size={18} className="mr-2" />}>Reply</Button>
            )}
        </Container>
    );
}