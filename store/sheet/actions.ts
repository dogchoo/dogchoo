import { ContenderItem } from "@/features/contender/model/types/contender-item";
import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { StoreAction } from "@/store/types";

export type UpdateTopicSheetPayload = TopicListItem;
type UpdateTopicSheetAction = StoreAction<"update-topic", UpdateTopicSheetPayload>;

export type UpdateContenderSheetPayload = ContenderItem;
type UpdateContenderSheetAction = StoreAction<"update-contender", UpdateContenderSheetPayload>;

export type SheetActions = UpdateTopicSheetAction | UpdateContenderSheetAction;
