"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateMessageFormValue, createMessageSchema } from "@/features/message/model/schema/create-message-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCirclePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  content: z.string().min(1, { message: "" }),
  name: z.string().min(1, { message: "" }),
});

export type FormValue = z.infer<typeof schema>;

interface ChatAreaProps {
  handleSubmit?: (value: FormValue) => void;
}

const ChatArea = ({ handleSubmit }: ChatAreaProps) => {
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
    <div className="m-2 lg:px-12">
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
                    />
                    <MessageCirclePlusIcon className="text-muted-foreground absolute top-1/2 right-4 size-6 -translate-y-1/2" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChatArea;
