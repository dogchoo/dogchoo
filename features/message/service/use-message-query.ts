import { convertMessageObject } from "@/features/message/utils";
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

  return convertMessageObject(snapshot.val());
};

export const useMessageQuery = () => {
  const queryClient = useQueryClient();

  const messagesQuery = (handler?: () => void) => {
    const query = useQuery({
      queryKey: [MESSAGES_QUERY_KEY],
      queryFn: fetchMessage,
      initialData: [],
      onSuccess: handler,
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
