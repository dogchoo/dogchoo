import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { db } from "@/libs/firebase";
import { push, ref } from "firebase/database";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";

export const useMessageMutation = () => {
  const addMessageMutation = useMutation({
    mutationFn: async (value: CreateMessageFormValue) => {
      const uuid = uuidv4();
      const dbRef = ref(db, "message");

      const clientId = localStorage.getItem("chatClientId");

      if (!clientId) return;

      await push(dbRef, {
        id: uuid,
        ...value,
        clientId,
        created: new Date().toISOString(),
      });
    },
  });

  return {
    addMessageMutation,
  };
};
