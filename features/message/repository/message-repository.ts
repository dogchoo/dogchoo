import { IMessageRepository } from "@/features/message/repository/interface";
import { Database, get, push, ref } from "firebase/database";
import { MessageEntity } from "../model/schema/create-message-schema";

export class MessageRepository implements IMessageRepository {
  constructor(private db: Database) {}

  async pushMessage(data: MessageEntity, topicId: string) {
    const messageRef = ref(this.db, `topic/${topicId}/messages`);
    return await push(messageRef, data);
  }

  async getMessagesByTopicId(topicId: string) {
    const messagesRef = ref(this.db, `topic/${topicId}/messages`);
    const snapshot = await get(messagesRef);

    if (!snapshot.exists()) {
      return {};
    }

    return snapshot.val();
  }
}
