"use client";

import CreateTopicDialog from "@/features/topic/ui/modals/create-topic-dialog";
import DeleteTopicDialog from "@/features/topic/ui/modals/delete-topic-dialog";
import UpdateTopicSheet from "@/features/topic/ui/modals/update-topic-sheet";

const TopicModalProvider = () => {
  return (
    <>
      <UpdateTopicSheet />
      <DeleteTopicDialog />
      <CreateTopicDialog />
    </>
  );
};

export default TopicModalProvider;
