import { apiCreateMessage } from "@/features/message/apis/api-create-message";
import { apiDeleteMessage } from "@/features/message/apis/api-delete-message";
import { useMutation } from "@tanstack/react-query";

export const useMessageMutation = () => {
  const addMessageMutation = useMutation({
    mutationFn: apiCreateMessage,
    onError: (e) => {
      console.log(e);
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: apiDeleteMessage,
    onError: (e) => {
      console.log(e);
    },
  });

  return {
    addMessageMutation,
    deleteMessageMutation,
  };
};
