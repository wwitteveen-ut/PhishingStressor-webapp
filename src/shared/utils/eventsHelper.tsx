import { UserEventType } from "@/mail/store/types";
import {
  CircleDot,
  FileDown,
  Link,
  MailOpen,
  MailX,
  MousePointer2,
  MousePointerClick,
  SquareArrowOutUpRight,
} from "lucide-react";

interface EventStyle {
  color: string;
  icon: React.ReactNode;
  text: string;
}

export function getEventStyle(
  eventType: UserEventType,
  size: number = 16
): EventStyle {
  switch (eventType) {
    case UserEventType.TIME_OPENED:
      return {
        color: "blue.4",
        icon: <MailOpen size={size} />,
        text: "Email Opened",
      };
    case UserEventType.TIME_CLOSED:
      return {
        color: "gray.4",
        icon: <MailX size={size} />,
        text: "Email Closed",
      };
    case UserEventType.HEATMAP:
      return {
        color: "orange.5",
        icon: <MousePointer2 size={size} />,
        text: "Heatmap",
      };
    case UserEventType.CLICK:
      return {
        color: "green.4",
        icon: <MousePointerClick size={size} />,
        text: "Click",
      };
    case UserEventType.LINK_CLICK:
      return {
        color: "red.4",
        icon: <SquareArrowOutUpRight size={size} />,
        text: "Link Click",
      };
    case UserEventType.LINK_HOVER:
      return {
        color: "yellow.4",
        icon: <Link size={size} />,
        text: "Link Hover",
      };
    case UserEventType.ATTACHMENT_DOWNLOADED:
      return {
        color: "violet.4",
        icon: <FileDown size={size} />,
        text: "Attachment Downloaded",
      };
    default:
      return {
        color: "gray.5",
        icon: <CircleDot size={size} />,
        text: "Unknown Event",
      };
  }
}
