import { CreateTopicFormValue } from "@/features/topic/model/schema/create-topic-schema";
import { request } from "@/util/request";

export const apiCreateTopic = (payload: CreateTopicFormValue) => {
  return request({
    method: "POST",
    url: "/api/topic",
    body: payload,
  });
};
