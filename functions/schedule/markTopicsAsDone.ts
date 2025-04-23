import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v1";

admin.initializeApp();

export const markTopicsAsDone = functions.pubsub
  .schedule("0 0 * * *") // 매일 00시
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    const db = admin.firestore();

    // 오늘 00시 타임스탬프 생성
    const now = new Date();
    now.setHours(0, 0, 0, 0); // 00:00:00
    const todayMidnight = admin.firestore.Timestamp.fromDate(now);

    // isDone이 false이고 created가 오늘 00시 이전인 것만 가져옴
    const snapshot = await db.collection("topics").where("isDone", "==", false).where("created", "<", todayMidnight).get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { isDone: true });
    });

    await batch.commit();
    console.log(`${snapshot.size}개의 토픽이 만료됨`);
  });
