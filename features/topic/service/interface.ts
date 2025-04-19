import { IBaseService } from "@/features/core/base-service";
import { CreateTopicFormValue } from "@/features/topic/model/schema/create-topic-schema";
import { ITopicRepository } from "@/features/topic/repository/interface";

export interface ITopicService extends IBaseService<ITopicRepository> {
  createTopic(data: CreateTopicFormValue): Promise<string | void>;
}
