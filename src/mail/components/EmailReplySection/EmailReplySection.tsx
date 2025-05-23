"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import EmailComposer from "../EmailComposer/EmailComposer";
import { ReplyIcon } from "lucide-react";

export default function EmailReplySection() {
    const [isReplying, setIsReplying] = useState(false);


    return (
        <div className="mt-6 flex space-x-2">
        
            {isReplying ? (
                <EmailComposer/>
            ) : (
                <Button onClick={() => setIsReplying(true)} rightSection={<ReplyIcon size={18} className="mr-2" />}>Reply</Button>
            )}
        </div>
    );
}