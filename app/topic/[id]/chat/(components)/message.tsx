"use client";

import { MessageListItem } from "@/features/message/model/types/message-list-item";
import { useClient } from "@/hooks/use-client";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsUpIcon } from "lucide-react";
import { forwardRef, useState } from "react";

interface MessageProps {
  className?: string;
  message: MessageListItem;
}

const getColorFromClientId = (clientId: string): { bg: string; text: string } => {
  const hashSource = clientId.slice(0, 8); // ex: "ac12e7f4"

  let hash = 0;
  for (let i = 0; i < hashSource.length; i++) {
    hash = hashSource.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  const saturation = 70;
  const lightness = 85;

  const bg = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const text = lightness > 70 ? "#1f1f1f" : "#fff";

  return { bg, text };
};

const Message = forwardRef(({ className, message }: MessageProps, ref) => {
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleClick = () => {
    setShowHeart((prev) => !prev);
  };

  const clientId = useClient();
  const isCurrentClient = message.clientId === clientId;

  const { bg, text } = getColorFromClientId(message.clientId);

  return (
    <motion.div
      className={cn("relative w-fit max-w-64 cursor-pointer rounded-md border p-2", className, isCurrentClient && "self-end")}
      initial={{ opacity: 0, translateX: isCurrentClient ? -20 : 20 }}
      animate={{ opacity: 1, translateX: isCurrentClient ? -2 : 2 }}
      exit={{ opacity: 0, translateX: isCurrentClient ? -20 : 20 }}
      style={{ backgroundColor: bg, color: text }}
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
});

export default Message;
