import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
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

export const getTimeLeft = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(now.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);

  const diffMs = midnight.getTime() - now.getTime();

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const formatted = String(hours).padStart(2, "0") + "시간 " + String(minutes).padStart(2, "0") + "분";

  return formatted;
};
