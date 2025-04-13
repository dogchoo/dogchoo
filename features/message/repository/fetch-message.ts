// Firebase Realtime Database 접근만 담당
import { db } from "@/libs/firebase";
import { get, ref } from "firebase/database";

export const getMessages = async () => {
  const dbRef = ref(db, "message");
  const snapshot = await get(dbRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val(); // 그대로 반환
};
