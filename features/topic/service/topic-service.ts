import { CreateTopicFormValue, createTopicSchema } from "@/features/topic/model/schema/create-topic-schema";
import { DeleteTopicFormValue } from "@/features/topic/model/schema/delete-topic-schema";
import { UpdateTopicFormValue, updateTopicSchema } from "@/features/topic/model/schema/update-topic-schema";
import { PaginatedTopicResult, TopicListItem } from "@/features/topic/model/types/topic-list-item";
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

  async deleteTopic(data: DeleteTopicFormValue) {
    await this.repository.delete(data.id);
  }

  async fetchTopic(id: string): Promise<TopicListItem | null> {
    return await this.repository.findById(id);
  }

  async fetchAllTopic(): Promise<TopicListItem[]> {
    return await this.repository.findAll();
  }

  async fetchTopicByPage(page = 1, limit = 10): Promise<PaginatedTopicResult> {
    return await this.repository.findByPage(page, limit);
  }
}
