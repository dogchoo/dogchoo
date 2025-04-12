import { MESSAGES_QUERY_KEY } from "@/features/message/service/use-message-query";
import { db } from "@/libs/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

export const useMessage = ({}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const dbRef = ref(db, "message");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      queryClient.setQueryData([MESSAGES_QUERY_KEY], snapshot.val());
    });

    return () => unsubscribe();
  }, [queryClient]);
};
