import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { getServerBaseUrl } from "@/util/get-server-base-url";
import { request } from "@/util/request";

export const apiGetLatestTopicServer = async () => {
  const baseUrl = await getServerBaseUrl();
  const { topic } = await request<{ topic: TopicListItem }>({
    method: "GET",
    url: `${baseUrl}/api/topic/latest`,
  });

  return topic;
};
