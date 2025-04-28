import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v1";

admin.initializeApp();

const firestoreDb = admin.firestore();
const realtimeDb = admin.database();

const isDoneTrueTopic = async (topicId: string) => {
  // 1. 토픽 isDone: true로 업데이트
  const topicRef = firestoreDb.collection("topics").doc(topicId);
  await topicRef.update({
    isDone: true,
  });

  // 2. Realtime Database에서 메시지 가져오기
  const messagesSnapshot = await realtimeDb.ref(`topic/${topicId}/messages`).get();
  const messages = messagesSnapshot.val();

  if (!messages) {
    console.log(`⚠️ topic ${topicId}: 마이그레이션할 메시지가 없습니다.`);
    return;
  }

  // 3. Firestore에 메시지 마이그레이션
  const entries = Object.entries(messages);
  const MAX_BATCH_SIZE = 500;
  let batch = firestoreDb.batch();
  let count = 0;

  for (const [msgId, msg] of entries) {
    const messageRef = topicRef.collection("messages").doc(msgId);
    batch.set(messageRef, msg);
    count++;

    if (count === MAX_BATCH_SIZE) {
      await batch.commit();
      batch = firestoreDb.batch();
      count = 0;
    }
  }

  if (count > 0) {
    await batch.commit();
  }

  console.log(`✅ topic ${topicId}: ${entries.length}개의 메시지가 마이그레이션 완료`);

  // 4. Realtime Database 메시지 삭제
  await realtimeDb.ref(`topic/${topicId}/messages`).remove();
  console.log(`🗑️ topic ${topicId}: Realtime DB 메시지 삭제 완료`);
};

// 🔥 매일 00시마다 실행되는 함수
export const markTopicsAsDone = functions.pubsub
  .schedule("0 0 * * *") // 매일 자정
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const todayMidnight = admin.firestore.Timestamp.fromDate(now);

    const snapshot = await firestoreDb.collection("topics").where("isDone", "==", false).where("created", "<", todayMidnight).get();

    if (snapshot.empty) {
      console.log("✅ 처리할 토픽이 없습니다.");
      return;
    }

    for (const doc of snapshot.docs) {
      const topicId = doc.id;
      try {
        await isDoneTrueTopic(topicId);
      } catch (error) {
        console.error(`❌ topic ${topicId} 처리 중 오류 발생:`, error);
      }
    }

    console.log(`🎯 총 ${snapshot.size}개의 토픽을 처리했습니다.`);
  });
