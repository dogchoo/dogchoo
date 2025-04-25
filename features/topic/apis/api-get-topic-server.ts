import { getServerBaseUrl } from "@/util/get-server-base-url";
import { request } from "@/util/request";

type Payload = {
  page?: number;
  limit?: number;
};

export const apiGetTopicServer = async (payload?: Payload) => {
  const baseUrl = await getServerBaseUrl();
  const { data } = await request({
    method: "GET",
    url: `${baseUrl}/api/topic`,
    query: {
      page: payload?.page,
      limit: payload?.limit,
    },
  });

  return data;
};
