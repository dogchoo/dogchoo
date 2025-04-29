import { request } from "@/util/request";

export const apiDeleteTopic = (id: string) => {
  return request({
    method: "DELETE",
    url: "/api/topic",
    body: {
      id,
    },
  });
};
