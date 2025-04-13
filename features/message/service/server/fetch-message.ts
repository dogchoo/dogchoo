import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { convertMessageObject } from "@/features/message/utils";
import { CustomError } from "@/util/custom-error";
import { getMessages } from "../../repository/fetch-message";

export const MESSAGES_QUERY_KEY = "MESSAGE";

export const fetchMessage = async (): Promise<MessageListItem[]> => {
  const data = await getMessages();

  if (!data) {
    throw new CustomError("메세지가 존재하지 않습니다.", 404);
  }

  return convertMessageObject(data);
};
