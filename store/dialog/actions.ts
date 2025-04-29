import { StoreAction } from "@/store/types";

export type DeleteTopicDilaogPaylod = { id: string };

type CreateTopicDialogAction = StoreAction<"create-topic">;
type DeleteTopicDialogAction = StoreAction<"delete-topic", DeleteTopicDilaogPaylod>;

export type DialogActions = CreateTopicDialogAction | DeleteTopicDialogAction;
