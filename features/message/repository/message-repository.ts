import { CreateMessageCommend, IMessageRepository } from "@/features/message/repository/interface";
import { CustomError } from "@/util/custom-error";
import { Firestore } from "firebase-admin/firestore";
import { Database, get, push, ref, remove } from "firebase/database";

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

  async migrateMessages(): Promise<void> {
    const topicsSnapshot = await this.firestore.collection("topics").where("isDone", "==", true).get();

    let totalMigrated = 0;

    for (const doc of topicsSnapshot.docs) {
      const topicId = doc.id;

      try {
        const messages = await this.getMessagesByTopicId(topicId);
        const entries = Object.entries(messages);

        if (entries.length === 0) {
          console.log(`⚠️ topic ${topicId}: 마이그레이션할 메시지가 없습니다.`);
          continue;
        }

        const MAX_BATCH_SIZE = 500;
        let count = 0;
        let batch = this.firestore.batch();

        for (const [msgId, msg] of entries) {
          const docRef = this.firestore.collection("topics").doc(topicId).collection("messages").doc(msgId); // 메시지 ID로 문서 생성

          batch.set(docRef, msg);
          count++;

          if (count === MAX_BATCH_SIZE) {
            await batch.commit();
            batch = this.firestore.batch();
            count = 0;
          }
        }

        if (count > 0) {
          await batch.commit();
        }

        const messageRef = ref(this.db, `topic/${topicId}/messages`);
        await remove(messageRef);

        totalMigrated += entries.length;
        console.log(`✅ topic ${topicId}: ${entries.length}개의 메시지 마이그레이션 및 삭제 완료`);
      } catch (err) {
        console.error(`❌ topic ${topicId} 마이그레이션 중 오류 발생:`, err);
      }
    }

    console.log(`🎉 총 ${totalMigrated}개의 메시지가 마이그레이션되었습니다.`);
    return;
  }
}
