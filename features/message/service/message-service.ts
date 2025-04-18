import { CreateMessageFormValue, createMessageSchema } from "@/features/message/model/schema/create-message-schema";
import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { MessageRepository } from "@/features/message/repository/message-repository";
import { IMessageService } from "@/features/message/service/interface";
import { CustomError } from "@/util/custom-error";

export class MessageService implements IMessageService {
  constructor(private repository: MessageRepository) {}

  async createMessage(data: CreateMessageFormValue, topicId: string) {
    const parsed = createMessageSchema.safeParse(data);

    if (!parsed.success) {
      throw new CustomError("유효하지 않은 메시지 형식입니다.", 400);
    }

    const created = new Date().toISOString();

    const message = {
      ...parsed.data,
      created,
    };

    const result = await this.repository.pushMessage(message, topicId);
    return result;
  }

  async fetchMessage(topicId: string): Promise<MessageListItem[]> {
    if (!topicId) {
      throw new CustomError("topicId가 필요합니다.", 400);
    }

    const raw = await this.repository.getMessagesByTopicId(topicId);

    return Object.entries(raw).map(([id, msg]: any) => ({
      id,
      ...msg,
    }));
  }
}
