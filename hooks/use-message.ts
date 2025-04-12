import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { MESSAGES_QUERY_KEY } from "@/features/message/service/use-message-query";
import { db } from "@/libs/firebase";
import { onValue, ref, set } from "firebase/database";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";

export const useMessage = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const dbRef = ref(db, "message");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const value = Object.entries(snapshot.val()).map(([key, value]) => ({
        id: key,
        ...(value as any),
      })) as MessageListItem[];

      const sorted = value.sort((a, b) => {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      });

      queryClient.setQueryData([MESSAGES_QUERY_KEY], sorted);
    });

    return () => unsubscribe();
  }, [queryClient]);

  const addMessage = (value: CreateMessageFormValue) => {
    const uuid = uuidv4();
    const dbRef = ref(db, `message/${uuid}`);

    const clientId = localStorage.getItem("chatClientId");

    if (!clientId) return;

    set(dbRef, {
      id: uuid,
      ...value,
      clientId,
      created: new Date().toISOString(),
    });
  };

  return {
    addMessage,
  };
};
