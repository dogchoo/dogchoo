import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { request } from "@/util/request";

export const apiCreateMessage = ({ topicId, ...body }: CreateMessageFormValue & { topicId: string }) => {
  return request({
    method: "POST",
    url: `/api/topic/${topicId}/message`,
    body,
  });
};
