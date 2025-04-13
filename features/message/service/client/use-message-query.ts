import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { convertMessageObject } from "@/features/message/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const MESSAGES_QUERY_KEY = "MESSAGE";

const fetchMessage = async () => {
  const response = await fetch("/api/message", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("에러.");
  }

  const data = await response.json();

  return convertMessageObject(data.messages);
};

export const useMessageQuery = () => {
  const queryClient = useQueryClient();

  const messagesQuery = () => {
    const query = useQuery<MessageListItem[]>({
      queryKey: [MESSAGES_QUERY_KEY],
      queryFn: fetchMessage,
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
