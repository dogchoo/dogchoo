import { IBaseService } from "@/features/core/base-service";
import { CreateTopicFormValue } from "@/features/topic/model/schema/create-topic-schema";
import { DeleteTopicFormValue } from "@/features/topic/model/schema/delete-topic-schema";
import { UpdateTopicFormValue } from "@/features/topic/model/schema/update-topic-schema";
import { PaginatedTopicResult, TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { ITopicRepository } from "@/features/topic/repository/interface";

export interface ITopicService extends IBaseService<ITopicRepository> {
  createTopic(data: CreateTopicFormValue): Promise<string | void>;
  updateTopic(data: UpdateTopicFormValue): Promise<void>;
  deleteTopic(data: DeleteTopicFormValue): Promise<void>;
  fetchTopic(id: string): Promise<TopicListItem | null>;
  fetchAllTopic(): Promise<TopicListItem[]>;
  fetchTopicByPage(page: number, limit: number): Promise<PaginatedTopicResult>;
  findLatest(): Promise<TopicListItem | null>;
}
