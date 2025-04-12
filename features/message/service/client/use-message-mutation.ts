import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { useMutation } from "react-query";

const createMessage = async (value: CreateMessageFormValue) => {
  const response = await fetch("/api/message", {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("에러.");
  }

  return response.json();
};

export const useMessageMutation = () => {
  const addMessageMutation = useMutation({
    mutationFn: createMessage,
  });

  return {
    addMessageMutation,
  };
};
