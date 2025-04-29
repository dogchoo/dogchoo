"use client";

import DatePicker from "@/components/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useTopicMutation } from "@/features/topic/hooks/use-topic-mutation";
import { UpdateTopicFormValue, updateTopicSchema } from "@/features/topic/model/schema/update-topic-schema";
import { UpdateTopicSheetPayload } from "@/store/sheet/actions";
import { useSheetStore } from "@/store/sheet/use-sheet-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const UpdateTopicSheet = () => {
  const [isOpen, sheetType, topic, close] = useSheetStore(useShallow((state) => [state.isOpen, state.sheetType, state.sheetData as UpdateTopicSheetPayload | null, state.actions.close]));
  const { updateTopicMutation } = useTopicMutation();
  const router = useRouter();
  const open = isOpen && sheetType === "update-topic";

  const form = useForm<UpdateTopicFormValue>({
    resolver: zodResolver(updateTopicSchema),
  });

  const cleanUp = () => {
    form.reset();
    close();
  };

  const onSubmit = (value: UpdateTopicFormValue) => {
    console.log(value);
    updateTopicMutation.mutate(value, {
      onSuccess: () => {
        toast("주제를 수정했습니다.");
        router.refresh();
        cleanUp();
      },
      onError: (e) => {
        console.log(e);
        toast("요청에 실패 했습니다.");
      },
    });
  };

  useEffect(() => {
    if (open && !!topic) {
      form.reset(topic);
    }
  }, [open]);

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => !nextOpen && cleanUp()}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{topic?.id} 주제</SheetTitle>
          <SheetDescription>{topic?.id}의 주제를 수정 합니다.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>주제 제목</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>주제 설명</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>주제 시작 날짜</FormLabel>
                  <FormControl>
                    <DatePicker
                      mode="single"
                      className="w-full"
                      numberOfMonths={1}
                      onChange={(date) => field.onChange((date as Date).toDateString())}
                      selected={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              isLoading={updateTopicMutation.isPending}
              type="submit"
              className="itmes-center flex cursor-pointer gap-x-2"
            >
              <SaveIcon />
              변경 사항 저장
            </LoadingButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateTopicSheet;
