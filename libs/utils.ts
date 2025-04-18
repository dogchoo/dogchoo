import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  dayPeriod: "short",
}).format;

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
