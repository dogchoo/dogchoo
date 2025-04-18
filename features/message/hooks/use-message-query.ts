import { apiGetMessages } from "@/features/message/apis/api-get-messages";
import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const MESSAGES_QUERY_KEY = "MESSAGE";

export const useMessageQuery = () => {
  const queryClient = useQueryClient();

  const messagesQuery = (topicId: string) => {
    const query = useQuery<MessageListItem[]>({
      queryKey: [MESSAGES_QUERY_KEY, topicId],
      queryFn: () => apiGetMessages(topicId),
      initialData: [],
      refetchOnWindowFocus: false,
    });

    return {
      ...query,
      messages: query.data,
      refresh: () => {
        queryClient.invalidateQueries({
          queryKey: [MESSAGES_QUERY_KEY],
        });
      },
    };
  };

  return {
    messagesQuery,
  };
};
