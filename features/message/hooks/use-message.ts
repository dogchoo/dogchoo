import { useMessageMutation } from "@/features/message/hooks/use-message-mutation";
import { MESSAGES_QUERY_KEY, useMessageQuery } from "@/features/message/hooks/use-message-query";
import { db } from "@/libs/firebase";
import { convertMessageObject } from "@/libs/utils";
import { useQueryClient } from "@tanstack/react-query";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

export const useMessage = (topicId: string) => {
  const queryClient = useQueryClient();
  const messageQuery = useMessageQuery();
  const { addMessageMutation } = useMessageMutation();

  useEffect(() => {
    const dbRef = ref(db, `topic/${topicId}/messages`);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const messages = convertMessageObject(snapshot.val());
      queryClient.setQueryData([MESSAGES_QUERY_KEY, topicId], messages);
    });

    return () => unsubscribe();
  }, [queryClient]);

  const initialMessage = messageQuery.messagesQuery;

  return {
    addMessageMutation,
    initialMessage,
  };
};
