import { db } from "@/libs/firebase"; // Firebase 초기화된 인스턴스
import { get, push, ref } from "firebase/database";
import { MessageEntity } from "../model/schema/create-message-schema";

export class MessageRepository {
  static async pushMessage(data: MessageEntity, topicId: string) {
    const messageRef = ref(db, `topic/${topicId}/messages`);
    return await push(messageRef, data);
  }

  static async getMessagesByTopicId(topicId: string) {
    const messagesRef = ref(db, `topic/${topicId}/messages`);
    const snapshot = await get(messagesRef);

    if (!snapshot.exists()) {
      return {};
    }

    return snapshot.val();
  }
}
