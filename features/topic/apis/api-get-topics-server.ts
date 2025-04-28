import { PaginatedTopicResult } from "@/features/topic/model/types/topic-list-item";
import { getServerBaseUrl } from "@/util/get-server-base-url";
import { request } from "@/util/request";

type Payload = {
  page?: number;
  limit?: number;
};

export const apiGetTopicsServer = async (payload?: Payload) => {
  const baseUrl = await getServerBaseUrl();
  const { data } = await request({
    method: "GET",
    url: `${baseUrl}/api/topic`,
    query: {
      page: payload?.page,
      limit: payload?.limit,
    },
  });

  return data as PaginatedTopicResult;
};
