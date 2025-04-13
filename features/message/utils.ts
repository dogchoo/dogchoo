import { MessageListItem } from "@/features/message/model/types/message-list-item";

export const convertMessageObject = (object: Record<string, any>) => {
  const value = Object.entries(object).map(([key, value]) => ({
    id: key,
    ...value,
  })) as MessageListItem[];

  return value.sort((a, b) => {
    return new Date(a.created).getTime() - new Date(b.created).getTime();
  });
};
