"use client";

import ChatArea, { FormValue } from "@/components/chat-area";
import Message from "@/components/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageQuery } from "@/features/message/service/use-message-query";
import { useMessage } from "@/hooks/use-message";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const WelcomePage = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { addMessage } = useMessage();

  const handleSubmit = (value: FormValue) => {
    addMessage(value);
    handleToBottom();
  };

  const handleToBottom = () => {
    contentRef.current?.scrollIntoView(false);
  };

  const { messages, isLoading, isFetching } = useMessageQuery().messagesQuery(() => handleToBottom());

  useEffect(() => {
    handleToBottom();
  }, []);

  useEffect(() => {
    let clientId = localStorage.getItem("chatClientId");
    if (!clientId) {
      clientId = uuidv4() as string;
      localStorage.setItem("chatClientId", clientId);
    }
  }, []);

  return (
    <div className="flex h-full flex-col pt-16">
      <div className="flex-1 overflow-hidden">
        <ScrollArea
          className="h-full px-6"
          ref={scrollAreaRef}
        >
          <div
            className="flex flex-col gap-2 pt-2 pb-44"
            ref={contentRef}
          >
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {messages &&
                  messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message}
                    />
                  ))}
              </AnimatePresence>
            </div>

            {/* {messages.map}
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
            </motion.div> */}
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
