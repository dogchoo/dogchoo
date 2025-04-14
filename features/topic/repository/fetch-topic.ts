import { db } from "@/libs/firebase";
import { CustomError } from "@/util/custom-error";
import { get, limitToLast, orderByChild, query, ref } from "firebase/database";

export const getTopic = async () => {
  const topicRef = ref(db, "topic");
  const latestQuery = query(topicRef, orderByChild("created"), limitToLast(1));
  const snapshot = await get(latestQuery);

  if (!snapshot.exists()) {
    throw new CustomError("토픽이 존재하지 않습니다.", 404);
  }

  const raw = snapshot.val();
  const [id, data] = Object.entries(raw)[0];

  return {
    id,
    ...(data as any),
  };
};
