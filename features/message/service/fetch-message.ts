import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { CustomError } from "@/util/custom-error";
import { getMessages } from "../model/repository/fetch-message";

export const MESSAGES_QUERY_KEY = "MESSAGE";

export const fetchMessage = async (): Promise<MessageListItem[]> => {
  const data = await getMessages();

  if (!data) {
    throw new CustomError("메세지가 존재하지 않습니다.", 404);
  }

  const value = Object.entries(data).map(([key, value]) => ({
    id: key,
    ...(value as any),
  })) as MessageListItem[];

  return value.sort((a, b) => {
    return new Date(a.created).getTime() - new Date(b.created).getTime();
  });
};
