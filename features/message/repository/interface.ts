import { IBaseRepository } from "@/features/core/base-repository";
import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";

export type CreateMessageCommend = CreateMessageFormValue & {
  created: string;
};

export interface IMessageRepository extends IBaseRepository<number, CreateMessageCommend> {
  getMessagesByTopicId(topicId: string): Promise<number>;
  create(message: CreateMessageCommend): Promise<string | void>;
}
