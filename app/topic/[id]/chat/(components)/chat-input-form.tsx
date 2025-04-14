"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateMessageFormValue, createMessageSchema } from "@/features/message/model/schema/create-message-schema";
import { useClient } from "@/hooks/use-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChatInputFormProps {
  isChatEnabled: boolean;
  isLoading: boolean;
  handleSubmit?: (value: CreateMessageFormValue) => void;
}

const omitsCreateMessageSchema = createMessageSchema.omit({ clientId: true, topicId: true });
type CreateMessageOmitClientFormValue = z.infer<typeof omitsCreateMessageSchema>;

const ChatInputForm = ({ isChatEnabled, isLoading, handleSubmit }: ChatInputFormProps) => {
  const clientId = useClient();

  const form = useForm<CreateMessageOmitClientFormValue>({
    resolver: zodResolver(omitsCreateMessageSchema),
    defaultValues: {
      name: "김슥삑",
    },
  });

  const onSubmit = (value: CreateMessageOmitClientFormValue) => {
    form.reset();
    handleSubmit?.({
      ...value,
      clientId,
      topicId: "1",
    });
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
                    <Button
                      className="text-muted-foreground absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-x-2"
                      size="sm"
                      type="submit"
                      variant="outline"
                    >
                      <SendIcon className="size-3" />
                      <p>전송</p>
                    </Button>
                    {isLoading && <LoaderCircleIcon className="text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin opacity-70" />}
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

export default ChatInputForm;
