import { useMessageMutation } from "@/features/message/service/use-message-mutation";
import { MESSAGES_QUERY_KEY, useMessageQuery } from "@/features/message/service/use-message-query";
import { convertMessageObject } from "@/features/message/utils";
import { db } from "@/libs/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

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

  const addMessage = addMessageMutation.mutate;
  const initialMessage = messageQuery.messagesQuery;

  return {
    addMessage,
    initialMessage,
  };
};
