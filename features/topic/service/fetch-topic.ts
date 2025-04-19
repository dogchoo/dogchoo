import { getTopic } from "@/features/topic/repository/fetch-topic";

export const getLatestTopic = async () => {
  return await getTopic();
};
