import { Badge, BadgeProps } from "@mantine/core";
import { AlertTriangle } from "lucide-react";

export default function EmailStatusBadge({
  isPhishing,
  size = 16,
  variant = "light",
}: {
  isPhishing: boolean;
  size?: number;
  variant?: BadgeProps["variant"];
}) {
  return (
    <Badge
      color={isPhishing ? "red" : "green"}
      variant={variant}
      leftSection={<AlertTriangle size={size} />}
    >
      {isPhishing ? "Phishing" : "Regular"}
    </Badge>
  );
}
