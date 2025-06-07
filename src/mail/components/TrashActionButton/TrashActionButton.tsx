import { Tooltip, ActionIcon } from "@mantine/core";
import { Trash, Undo } from "lucide-react";

interface ITrashActionButtonProps {
  isTrashed: boolean;
  onClick: () => void;
}

export default function TrashActionButton({
  isTrashed,
  onClick,
}: ITrashActionButtonProps) {
  if (isTrashed) {
    return (
      <Tooltip label="Restore email">
        <ActionIcon variant="white" color="green" onClick={onClick}>
          <Undo size={20} />
        </ActionIcon>
      </Tooltip>
    );
  }

  return (
    <Tooltip label="Trash email">
      <ActionIcon variant="white" color="red" onClick={onClick}>
        <Trash size={20} />
      </ActionIcon>
    </Tooltip>
  );
}
