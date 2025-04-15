import { request } from "@/util/request";

export const apiGetLatestTopic = () => {
  return request({
    method: "GET",
    url: "/api/topic/latest",
  });
};
