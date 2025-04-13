import { db } from "@/libs/firebase"; // Firebase 초기화된 인스턴스
import { push, ref } from "firebase/database";
import { CreateTopicPayload } from "../model/schema/create-topic-schema";

// 실제 메시지를 저장하는 함수
export const pushTopic = async (message: CreateTopicPayload) => {
  const messageRef = ref(db, "message");
  return await push(messageRef, message);
};
