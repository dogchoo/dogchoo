import { UpdateTopicFormValue } from "@/features/topic/model/schema/update-topic-schema";
import { request } from "@/util/request";

export const apiUpdateTopic = (payload: UpdateTopicFormValue) => {
  return request({
    method: "PUT",
    url: "/api/topic",
    body: payload,
  });
};
