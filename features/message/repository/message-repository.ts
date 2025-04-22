import { CreateMessageCommend, IMessageRepository } from "@/features/message/repository/interface";
import { CustomError } from "@/util/custom-error";
import { Firestore } from "firebase-admin/firestore";
import { Database, get, push, ref } from "firebase/database";

export class MessageRepository implements IMessageRepository {
  constructor(
    private db: Database,
    private firestore: Firestore,
  ) {}

  async getMessagesByTopicId(topicId: string) {
    const messagesRef = ref(this.db, `topic/${topicId}/messages`);
    const snapshot = await get(messagesRef);

    if (!snapshot.exists()) {
      return {};
    }

    return snapshot.val();
  }

  async create(message: CreateMessageCommend): Promise<string | void> {
    try {
      const { topicId, ...messageBody } = message;

      const messageRef = ref(this.db, `topic/${topicId}/messages`);
      const newMessageRef = await push(messageRef, messageBody);

      if (!newMessageRef.key) {
        throw new CustomError("메시지 ID를 생성하지 못했습니다.", 500);
      }

      return newMessageRef.key;
    } catch (err) {
      console.error("메시지 저장 실패:", err);
      throw new CustomError("메시지 저장 중 오류가 발생했습니다.", 500);
    }
  }
}
