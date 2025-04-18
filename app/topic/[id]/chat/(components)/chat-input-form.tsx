"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateMessageFormValue, createMessageSchema, MAX_MESSAGE_CONTENT_LENGTH } from "@/features/message/model/schema/create-message-schema";
import { useClient } from "@/hooks/use-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChatInputFormProps {
  isChatEnabled: boolean;
  isLoading: boolean;
  handleSubmit?: (value: CreateMessageFormValue) => void;
}

const omitsCreateMessageSchema = createMessageSchema.omit({ clientId: true });
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
                    <Textarea
                      autoFocus
                      className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring h-14 max-h-60 min-h-14 w-full resize-none overflow-y-hidden rounded-md border px-3 py-2 pr-16 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                      placeholder="채팅 메시지를 입력 해 주세요."
                      value={field.value || ""}
                      disabled={!isChatEnabled}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;

                        if (target.value.length <= MAX_MESSAGE_CONTENT_LENGTH) {
                          field.onChange(e);
                        } else {
                          target.value = target.value.slice(0, MAX_MESSAGE_CONTENT_LENGTH);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.nativeEvent.isComposing) return;

                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    />

                    <p className={cn("text-muted-foreground absolute top-2 right-2 text-xs", (field.value?.length || 0) === MAX_MESSAGE_CONTENT_LENGTH && "text-rose-500")}>
                      ({field.value?.length || 0} /{MAX_MESSAGE_CONTENT_LENGTH})
                    </p>

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
