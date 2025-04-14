"use client";

import ChatInputForm from "@/app/topic/[id]/chat/(components)/chat-input-form";
import Message from "@/components/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateMessageFormValue } from "@/features/message/model/schema/create-message-schema";
import { useMessage } from "@/features/message/service/client/use-message";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BehaviorSubject, Subject } from "rxjs";

const ChatArea = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const [_, setCooldownTime] = useState(0);

  const submitSubject = useRef(new Subject<CreateMessageFormValue>());
  const chatEnabledSubject = useRef(new BehaviorSubject<boolean>(true));
  const timestampsRef = useRef<number[]>([]);

  const { addMessageMutation, initialMessage } = useMessage();
  const { messages, isLoading, isFetching } = initialMessage();

  const handleSubmit = (value: CreateMessageFormValue) => {
    if (isChatEnabled) {
      addMessageMutation.mutate(value);
      handleToBottom();
      submitSubject.current.next(value);
    }
  };

  const handleToBottom = () => {
    contentRef.current?.scrollIntoView(false);
  };

  useEffect(() => {
    handleToBottom();
  }, [messages]);

  useEffect(() => {
    const subscription = submitSubject.current.subscribe(() => {
      const now = Date.now();
      timestampsRef.current.push(now);
      timestampsRef.current = timestampsRef.current.filter((ts) => now - ts <= 1000);

      if (timestampsRef.current.length > 3) {
        chatEnabledSubject.current.next(false);
        setIsChatEnabled(false);
        setCooldownTime(10);

        const countdownInterval = setInterval(() => {
          setCooldownTime((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              chatEnabledSubject.current.next(true);
              setIsChatEnabled(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setTimeout(() => {
          chatEnabledSubject.current.next(true);
          setIsChatEnabled(true);
          setCooldownTime(0);
          timestampsRef.current = [];
        }, 10000);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = chatEnabledSubject.current.subscribe((enabled) => {
      setIsChatEnabled(enabled);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading || isFetching) {
    return <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">채팅을 불러오는 중 입니다.</p>;
  }

  return (
    <div className="mt-16 flex h-full flex-col">
      <div className="mb-48 flex-1 overflow-hidden">
        <ScrollArea
          className="h-full px-6"
          ref={scrollAreaRef}
        >
          <div
            className="flex flex-col gap-2 pt-2"
            ref={contentRef}
          >
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
        </ScrollArea>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-3 shadow-inner">
        <ChatInputForm
          isLoading={addMessageMutation.isPending}
          handleSubmit={handleSubmit}
          isChatEnabled={isChatEnabled}
        />
      </div>
    </div>
  );
};

export default ChatArea;
