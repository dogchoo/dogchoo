"use client";

import { MessageListItem } from "@/features/message/model/types/message";
import { useClient } from "@/hooks/use-client";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";

interface MessageProps {
  className?: string;
  message: MessageListItem;
}

const Message = ({ className, message }: MessageProps) => {
  const clientId = useClient();

  console.log(clientId, message.clientId);
  return (
    <motion.div
      className={cn("w-fit rounded-md border p-2", className, message.clientId === clientId && "self-end")}
      initial={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: -2 }}
      exit={{ opacity: 0, translateX: -20 }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm">{message.content}</p>
      </div>
      <div className="flex items-center justify-between gap-2"></div>
    </motion.div>
  );
};

export default Message;
