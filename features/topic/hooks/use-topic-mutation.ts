import { apiCreateTopic } from "@/features/topic/apis/api-create-topic";
import { apiDeleteTopic } from "@/features/topic/apis/api-delete-topic";
import { apiUpdateTopic } from "@/features/topic/apis/api-update-topic";
import { useMutation } from "@tanstack/react-query";

export const useTopicMutation = () => {
  const createTopicMutation = useMutation({
    mutationFn: apiCreateTopic,
  });

  const updateTopicMutation = useMutation({
    mutationFn: apiUpdateTopic,
  });

  const deleteTopicMutation = useMutation({
    mutationFn: apiDeleteTopic,
  });

  return {
    createTopicMutation,
    updateTopicMutation,
    deleteTopicMutation,
  };
};
