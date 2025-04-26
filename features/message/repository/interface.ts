import { IBaseRepository } from "@/features/core/base-repository";
import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { DeleteMessageFormValue } from "@/features/message/model/schema/delete-message-schema";
import { UpdateMessageFormValue } from "@/features/message/model/schema/update-message-schema";

export type CreateMessageCommend = CreateMessageFormValue & {
  created: string;
};

export type UpdateMessageCommend = UpdateMessageFormValue;
export type DeleteMessageCommend = DeleteMessageFormValue;

export interface IMessageRepository extends IBaseRepository<number, CreateMessageCommend> {
  getMessagesByTopicId(topicId: string): Promise<number>;
  create(data: CreateMessageCommend): Promise<string | void>;
  update(data: UpdateMessageCommend): Promise<void>;
  deleteMessage(data: DeleteMessageCommend): Promise<void>;
  migrateMessages(): Promise<void>;
}
