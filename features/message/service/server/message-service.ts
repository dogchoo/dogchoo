import { CustomError } from "@/util/custom-error";
import { CreateMessageFormValue, createMessageSchema } from "../../model/schema/create-message-schema";
import { MessageListItem } from "../../model/types/message-list-item";
import { MessageRepository } from "../../repository/message-repository";

export class MessageService {
  static async createMessage(data: CreateMessageFormValue, topicId: string) {
    const parsed = createMessageSchema.safeParse(data);

    if (!parsed.success) {
      throw new CustomError("유효하지 않은 메시지 형식입니다.", 400);
    }

    const created = new Date().toISOString();

    const message = {
      ...parsed.data,
      created,
    };

    const result = await MessageRepository.pushMessage(message, topicId);
    return result;
  }

  static async fetchMessage(topicId: string): Promise<MessageListItem[]> {
    if (!topicId) {
      throw new CustomError("topicId가 필요합니다.", 400);
    }

    const raw = await MessageRepository.getMessagesByTopicId(topicId);

    return Object.entries(raw).map(([id, msg]: any) => ({
      id,
      ...msg,
    }));
  }
}
