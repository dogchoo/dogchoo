"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateMessageFormValue, createMessageSchema } from "@/features/message/model/schema/create-message-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCirclePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  content: z.string().min(1, { message: "" }),
  name: z.string().min(1, { message: "" }),
});

export type FormValue = z.infer<typeof schema>;

interface ChatAreaProps {
  cooldownTime: number;
  isChatEnabled: boolean;
  handleSubmit?: (value: FormValue) => void;
}

const ChatArea = ({ cooldownTime, isChatEnabled, handleSubmit }: ChatAreaProps) => {
  const form = useForm<CreateMessageFormValue>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      name: "ㅇㅇ",
    },
  });

  const onSubmit = async (value: CreateMessageFormValue) => {
    form.reset();
    handleSubmit?.(value);
  };

  return (
    <div className="relative m-2 lg:px-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-x-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Input
                      autoFocus
                      className="h-14 text-sm"
                      {...field}
                      placeholder="채팅 메시지를 입력 해 주세요."
                      value={field.value || ""}
                      disabled={!isChatEnabled}
                    />
                    <MessageCirclePlusIcon className="text-muted-foreground absolute top-1/2 right-4 size-6 -translate-y-1/2" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>

        <AnimatePresence>
          {!isChatEnabled && (
            <motion.div
              className="absolute bottom-0 left-1/2 w-fit -translate-x-1/2 truncate text-sm text-rose-500"
              initial={{ opacity: 0, top: -40 }}
              animate={{ opacity: 1, top: -60 }}
              exit={{ opacity: 0, top: -40 }}
            >
              도배가 감지되어 채팅이 10초간 차단 됩니다.
            </motion.div>
          )}
        </AnimatePresence>
      </Form>
    </div>
  );
};

export default ChatArea;
