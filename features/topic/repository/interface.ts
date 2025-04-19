import { IBaseRepository } from "@/features/core/base-repository";
import { UpdateTopicFormValue } from "@/features/topic/model/schema/update-topic-schema";
import { DocumentReference } from "firebase-admin/firestore";

import { CreateTopicFormValue } from "@/features/topic/model/schema/create-topic-schema";

// repository에서만
export type CreateTopicCommend = CreateTopicFormValue & {
  isDone: boolean;
  created: Date;
};

export type UpdateTopicCommend = UpdateTopicFormValue;

export interface ITopicRepository extends IBaseRepository<number, CreateTopicCommend, UpdateTopicFormValue> {
  pushTopic(data: CreateTopicCommend): Promise<DocumentReference>;
  create(data: CreateTopicCommend): Promise<string | void>;
  update(data: UpdateTopicFormValue): Promise<void>;
  delete(id: string): Promise<void>;
}
