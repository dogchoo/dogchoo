"use client";

import ChatArea, { FormValue } from "@/components/chat-area";
import Message from "@/components/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageQuery } from "@/features/message/service/use-message-query";
import { useMessage } from "@/hooks/use-message";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const WelcomePage = () => {
  const { messages, isLoading, isFetching } = useMessageQuery().messagesQuery();
  const [values, setValues] = useState<FormValue[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (value: any) => {
    setValues((prev) => [...prev, value]);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 0);
  };

  useMessage({});

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [values]);

  if (isLoading || isFetching) {
    return <p className="text-muted-foreground text-sm"> 데이터를 불러오는 중 입니다.</p>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <ScrollArea
          className="h-full px-6"
          ref={scrollRef}
        >
          <div className="flex flex-col gap-2 pt-2 pb-24">
            <motion.div className="w-fit rounded-md border p-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm">{messages.id.content}</p>
                <p className="text-xs">{new Date().toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <ThumbsUpIcon className="size-3 text-sm" />
                  <ThumbsDownIcon className="size-3 text-sm" />
                </div>
                <p className="text-muted-foreground text-right text-xs">{messages.id.name}</p>
              </div>
            </motion.div>
            <div className="flex flex-col items-end gap-2">
              <AnimatePresence>
                {values.map((value, index) => (
                  <Message
                    key={index}
                    message={value}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-3 shadow-inner">
        <ChatArea handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default WelcomePage;
