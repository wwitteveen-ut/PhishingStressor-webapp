import { ResearcherEmail } from "@/researcher/store/types";
import { Badge, Group, Tooltip } from "@mantine/core";

export default function AttachmentsBadge({
  attachments,
  maxNumOfAttachments = 1,
}: {
  attachments: ResearcherEmail["attachments"];
  maxNumOfAttachments?: number;
}) {
  if (attachments.length > maxNumOfAttachments) {
    return (
      <Tooltip
        bg={"gray.2"}
        withArrow
        arrowSize={9}
        arrowRadius={2}
        label={
          <Group>
            {attachments.map((attachment) => (
              <Badge
                radius={"xs"}
                variant="white"
                color="violet"
                key={attachment.id}
              >
                {attachment.filename}
              </Badge>
            ))}
          </Group>
        }
      >
        <Badge variant="light" color="violet">
          Attachments ({attachments.length})
        </Badge>
      </Tooltip>
    );
  }
  return attachments.map((attachment) => (
    <Badge key={attachment.id} variant="light" color="violet">
      {attachment.filename}
    </Badge>
  ));
}
