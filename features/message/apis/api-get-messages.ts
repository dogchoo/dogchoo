import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { request } from "@/util/request";

export const apiGetMessages = async (topicId: string) => {
  const { data } = await request<MessageListItem[]>({
    method: "GET",
    url: `/api/topic/${topicId}/message`,
  });

  return data;
};
