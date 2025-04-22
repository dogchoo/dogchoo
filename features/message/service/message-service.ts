import { container } from "@/features/container";
import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { IMessageRepository } from "@/features/message/repository/interface";
import { IMessageService } from "@/features/message/service/interface";
import { CustomError } from "@/util/custom-error";
export class MessageService implements IMessageService {
  constructor(private repository: IMessageRepository) {}

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

  async create(data: CreateMessageFormValue): Promise<string | void> {
    const topicDoc = await container.topicService.fetchTopic(data.topicId);

    if (!topicDoc) {
      throw new CustomError("해당 토픽이 존재하지 않습니다.", 404);
    }

    if (topicDoc.isDone) {
      throw new CustomError("이 토픽은 만료되었습니다.", 403);
    }

    const messageData = {
      ...data,
      created: new Date().toISOString(),
    };

    return await this.repository.create(messageData);
  }
}
