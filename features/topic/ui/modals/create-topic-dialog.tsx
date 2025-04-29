import DatePicker from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { useTopicMutation } from "@/features/topic/hooks/use-topic-mutation";
import { CreateTopicFormValue, createTopicSchema } from "@/features/topic/model/schema/create-topic-schema";
import { useDialogStore } from "@/store/dialog/use-dialog-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const CreateTopicDialog = () => {
  const [isOpen, dialogType, close] = useDialogStore(useShallow((state) => [state.isOpen, state.dialogType, state.actions.close]));
  const { createTopicMutation } = useTopicMutation();
  const router = useRouter();
  const open = isOpen && dialogType === "create-topic";

  const form = useForm<CreateTopicFormValue>({
    resolver: zodResolver(createTopicSchema),
  });

  const onSubmit = (value: CreateTopicFormValue) => {
    createTopicMutation.mutate(value, {
      onSuccess: () => {
        router.refresh();
        toast("주제를 추가 했습니다.");
        close();
      },
      onError: (e) => {
        console.log(e);
        toast("에러 ㅠㅠ");
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => open && close()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>주제 추가</DialogTitle>
          <DialogDescription>주제를 추가 합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>주제 이름 *</FormLabel>
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
                  <FormLabel>주제 설명 *</FormLabel>
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
                  <FormLabel>시작 날짜</FormLabel>
                  <FormControl>
                    <DatePicker
                      numberOfMonths={1}
                      className="w-full"
                      mode="single"
                      onChange={(date) => field.onChange((date as Date).toDateString())}
                      selected={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              isLoading={createTopicMutation.isPending}
              disabled={!form.formState.isValid}
            >
              주제 추가
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
