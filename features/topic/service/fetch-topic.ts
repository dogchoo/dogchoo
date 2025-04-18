import { getTopic } from "./../../repository/fetch-topic";

export const getLatestTopic = async () => {
  return await getTopic();
};
