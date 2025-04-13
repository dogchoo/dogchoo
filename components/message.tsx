"use client";

import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { useClient } from "@/hooks/use-client";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsUpIcon } from "lucide-react";
import { useState } from "react";

interface MessageProps {
  className?: string;
  message: MessageListItem;
}

const Message = ({ className, message }: MessageProps) => {
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleClick = () => {
    setShowHeart((prev) => !prev);
  };

  const clientId = useClient();
  const isCurrentClient = message.clientId === clientId;

  return (
    <motion.div
      className={cn("relative w-fit max-w-48 cursor-pointer rounded-md border p-2", className, isCurrentClient && "self-end")}
      initial={{ opacity: 0, translateX: isCurrentClient ? -20 : 20 }}
      animate={{ opacity: 1, translateX: isCurrentClient ? -2 : 2 }}
      exit={{ opacity: 0, translateX: isCurrentClient ? -20 : 20 }}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm">{message.content}</p>
      </div>
      <div className="flex items-center justify-between gap-2"></div>

      <AnimatePresence>
        {showHeart && (
          <motion.div
            key="heart"
            animate={{
              scale: 1,
              rotate: [0, -6, 6, -6, 0],
              x: [0, -3, 3, -3, 0],
            }}
            initial={{ scale: 0.5 }}
            transition={{ duration: 0.1 }}
            className={cn("absolute bottom-1 text-xl", isCurrentClient ? "-left-5" : "-right-5")}
          >
            <ThumbsUpIcon className="size-3 fill-sky-400 text-sky-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Message;
