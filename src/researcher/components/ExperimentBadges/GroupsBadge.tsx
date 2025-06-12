import { ResearcherEmail } from "@/researcher/store/types";
import { Badge, Group, Tooltip } from "@mantine/core";

export default function GroupsBadge({
  groups,
}: {
  groups: ResearcherEmail["groups"];
}) {
  if (groups.length > 1) {
    return (
      <Tooltip
        bg={"gray.2"}
        withArrow
        arrowSize={9}
        arrowRadius={2}
        label={
          <Group>
            {groups.map((group) => (
              <Badge radius={"xs"} variant="white" key={group.id}>
                {group.name}
              </Badge>
            ))}
          </Group>
        }
      >
        <Badge variant="light">Groups ({groups.length})</Badge>
      </Tooltip>
    );
  }
  return <Badge variant="light">{groups[0].name}</Badge>;
}
