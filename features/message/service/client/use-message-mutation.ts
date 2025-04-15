import { apiCreateMessage } from "@/features/message/service/client/apis/api-create-message";
import { useMutation } from "@tanstack/react-query";

export const useMessageMutation = () => {
  const addMessageMutation = useMutation({
    mutationFn: apiCreateMessage,
  });

  return {
    addMessageMutation,
  };
};
