import { IBaseRepository } from "@/features/core/base-repository";
import { MessageEntity } from "@/features/message/model/schema/create-message-schema";
import { DatabaseReference } from "firebase/database";

export interface IMessageRepository extends IBaseRepository<any, MessageEntity> {
  pushMessage(data: MessageEntity, topicId: string): Promise<DatabaseReference>;
  getMessagesByTopicId(topicId: string): Promise<any>;
}
