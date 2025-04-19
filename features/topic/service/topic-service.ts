import { CreateTopicFormValue, createTopicSchema } from "@/features/topic/model/schema/create-topic-schema";
import { UpdateTopicFormValue, updateTopicSchema } from "@/features/topic/model/schema/update-topic-schema";
import { ITopicRepository } from "@/features/topic/repository/interface";
import { ITopicService } from "@/features/topic/service/interface";
import { CustomError } from "@/util/custom-error";

export class TopicService implements ITopicService {
  constructor(private repository: ITopicRepository) {}

  async createTopic(data: CreateTopicFormValue): Promise<string | void> {
    const parsed = createTopicSchema.safeParse(data);

    if (!parsed.success) {
      throw new CustomError("유효하지 않은 타입입니다.", 400);
    }

    const topicData = {
      ...parsed.data,
      created: new Date(),
      isDone: false,
    };

    const result = await this.repository.create(topicData);
    return result;
  }

  async updateTopic(data: UpdateTopicFormValue) {
    const parsed = updateTopicSchema.safeParse(data);

    if (!parsed.success) {
      throw new CustomError("유효하지 않은 타입입니다.", 400);
    }

    await this.repository.update(parsed.data);
  }

  async deleteTopic(id: string) {
    await this.repository.delete(id);
  }
}
