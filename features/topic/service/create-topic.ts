import { CreateTopicFormValue, createTopicSchema } from "@/features/topic/model/schema/create-topic-schema";
import { pushTopic } from "@/features/topic/repository/create-topic";
import { CustomError } from "@/util/custom-error";

export const createTopic = async (data: CreateTopicFormValue) => {
  const parsed = createTopicSchema.safeParse(data);

  if (!parsed.success) {
    throw new CustomError("유효하지 않은 형식입니다.", 400);
  }

  const created = new Date().toISOString();

  const createTopic = {
    ...parsed.data,
    created: created,
    isDone: false,
  };

  const result = await pushTopic(createTopic);

  return result;
};
