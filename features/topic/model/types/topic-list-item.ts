import { MessageListItem } from "@/features/message/model/types/message-list-item";

export interface TopicListItem {
  title: string;
  isDone: boolean;
  created: string;
  message: Record<string, MessageListItem>;
}
