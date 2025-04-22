import { IBaseService } from "@/features/core/base-service";
import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { IMessageRepository } from "@/features/message/repository/interface";

export interface IMessageService extends IBaseService<IMessageRepository> {
  fetchMessage(topicId: string): Promise<MessageListItem[]>;
  create(data: CreateMessageFormValue): Promise<string | void>;
}
