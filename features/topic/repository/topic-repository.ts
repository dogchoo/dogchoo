import { db } from "@/libs/firebase"; // Firebase 초기화된 인스턴스
import { get, push, ref } from "firebase/database";
import { CreateTopicPayload } from "../model/schema/create-topic-schema";

export class TopicRepository {
  static async pushTopic(topic: CreateTopicPayload) {
    const topicRef = ref(db, "topic");
    return await push(topicRef, topic);
  }

  static async getAllTopics() {
    const topicRef = ref(db, "topic");
    const snapshot = await get(topicRef);

    if (!snapshot.exists()) return {};

    return snapshot.val();
  }
}
