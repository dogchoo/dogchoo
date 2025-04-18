import { IBaseService } from "@/features/core/base-service";
import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { IMessageRepository } from "@/features/message/repository/interface";
import { DatabaseReference } from "firebase/database";

export interface IMessageService extends IBaseService<IMessageRepository> {
  createMessage(data: CreateMessageFormValue, topicId: string): Promise<DatabaseReference>;
  fetchMessage(topicId: string): Promise<MessageListItem[]>;
}
