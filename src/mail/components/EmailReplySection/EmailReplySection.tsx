import { ReplyIcon } from "lucide-react";
import { Button } from "@mantine/core";

export default function EmailReplySection() {

    return (
        <div className="mt-6 flex space-x-2">
            <Button rightSection={<ReplyIcon size={18} className="mr-2" />}>Reply</Button>
        </div>
    );
}