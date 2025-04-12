import { MessageListItem } from "@/features/message/model/types/message";
import { db } from "@/libs/firebase";
import { get, ref } from "firebase/database";
import { useQuery, useQueryClient } from "react-query";

export const MESSAGES_QUERY_KEY = "MESSAGE";

const fetchMessage = async () => {
  const dbRef = ref(db, "message");
  const snapshot = await get(dbRef);

  if (!snapshot.exists()) {
    throw new Error("No data found");
  }

  const value = Object.entries(snapshot.val()).map(([key, value]) => ({
    id: key,
    ...(value as any),
  })) as MessageListItem[];

  return value.sort((a, b) => {
    return new Date(a.created).getTime() - new Date(b.created).getTime();
  });
};

export const useMessageQuery = () => {
  const queryClient = useQueryClient();

  const messagesQuery = (handler: () => void) => {
    const query = useQuery({
      queryKey: [MESSAGES_QUERY_KEY],
      queryFn: fetchMessage,
      initialData: [],
      onSuccess: handler,
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
