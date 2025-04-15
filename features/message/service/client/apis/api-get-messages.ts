import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { request } from "@/util/request";

export const apiGetMessages = async (topicId: string) => {
  const { messages } = await request<{ messages: MessageListItem[] }>({
    method: "GET",
    url: "/api/topic/message",
    query: {
      topicId,
    },
  });

  return messages;
};
