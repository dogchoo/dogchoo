import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  dayPeriod: "short",
}).format;
