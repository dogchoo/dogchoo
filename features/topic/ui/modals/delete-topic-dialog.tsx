import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTopicMutation } from "@/features/topic/hooks/use-topic-mutation";
import { DeleteTopicDilaogPaylod } from "@/store/dialog/actions";
import { useDialogStore } from "@/store/dialog/use-dialog-store";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const DeleteTopicDialog = () => {
  const [isOpen, dialogType, topic, close] = useDialogStore(useShallow((state) => [state.isOpen, state.dialogType, state.dialogData as DeleteTopicDilaogPaylod, state.actions.close]));
  const router = useRouter();
  const { deleteTopicMutation } = useTopicMutation();

  const open = isOpen && dialogType === "delete-topic";

  const handleAction = () => {
    if (!topic.id) return;

    deleteTopicMutation.mutate(topic.id, {
      onSuccess: () => {
        router.refresh();
        toast("주제를 삭제 했습니다.");
        close();
      },
      onError: (e) => {
        console.log(e);
        toast("요청에 실패 했습니다.");
      },
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => !nextOpen && close()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{topic?.id} 주제를 정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>삭제된 데이터는 복구할 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-x-2"
            onClick={handleAction}
          >
            <Trash2Icon className="size-4" />
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTopicDialog;
