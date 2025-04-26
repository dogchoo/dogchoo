import { IBaseRepository } from "@/features/core/base-repository";
import { UpdateTopicFormValue } from "@/features/topic/model/schema/update-topic-schema";

import { CreateTopicFormValue } from "@/features/topic/model/schema/create-topic-schema";
import { PaginatedTopicResult, TopicListItem } from "@/features/topic/model/types/topic-list-item";

// repository에서만
export type CreateTopicCommend = CreateTopicFormValue & {
  isDone: boolean;
  created: Date;
};

export type UpdateTopicCommend = UpdateTopicFormValue;

export interface ITopicRepository extends IBaseRepository<TopicListItem, CreateTopicCommend, UpdateTopicFormValue> {
  create(data: CreateTopicCommend): Promise<string | void>;
  update(data: UpdateTopicCommend): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<TopicListItem[]>;
  findById(id: string): Promise<TopicListItem | null>;
  findByPage(page: number, limit: number): Promise<PaginatedTopicResult>;
  findLatest(): Promise<TopicListItem | null>;
  getTodayTopic(startOfToday: Date, endOfToday: Date): Promise<TopicListItem[]>;
}
