import { useMessageMutation } from "@/features/message/service/client/use-message-mutation";
import { MESSAGES_QUERY_KEY, useMessageQuery } from "@/features/message/service/client/use-message-query";
import { convertMessageObject } from "@/features/message/utils";
import { db } from "@/libs/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

export const useMessage = () => {
  const queryClient = useQueryClient();
  const messageQuery = useMessageQuery();
  const { addMessageMutation } = useMessageMutation();

  useEffect(() => {
    const dbRef = ref(db, "message");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const messages = convertMessageObject(snapshot.val());
      queryClient.setQueryData([MESSAGES_QUERY_KEY], messages);
    });

    return () => unsubscribe();
  }, [queryClient]);

  const initialMessage = messageQuery.messagesQuery;

  return {
    addMessageMutation,
    initialMessage,
  };
};
