import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { getServerBaseUrl } from "@/util/get-server-base-url";
import { request } from "@/util/request";

export const apiGetLatestTopicServer = async () => {
  const baseUrl = await getServerBaseUrl();
  const { data } = await request<TopicListItem>({
    method: "GET",
    url: `${baseUrl}/api/topic/latest`,
  });

  return data;
};
