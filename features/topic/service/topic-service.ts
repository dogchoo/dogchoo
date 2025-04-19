import { CreateTopicFormValue, createTopicSchema } from "@/features/topic/model/schema/create-topic-schema";
import { TopicRepository } from "@/features/topic/repository/topic-repository";
import { db } from "@/libs/firebase";
import { CustomError } from "@/util/custom-error";
import { get, ref } from "firebase/database";

export class TopicService {
  static async createTopic(data: CreateTopicFormValue) {
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

    const result = await TopicRepository.pushTopic(createTopic);
    return result;
  }

  static async getLatestTopic() {
    const raw = await TopicRepository.getAllTopics();

    if (!raw || Object.keys(raw).length === 0) {
      return {};
    }

    const sorted = Object.entries(raw).sort(([, a]: any, [, b]: any) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    const [id, data] = sorted[0];

    return {
      id,
      ...(data as any),
    };
  }

  static async getTopicById(topicId: string) {
    const topicRef = ref(db, `topic/${topicId}`);
    const snapshot = await get(topicRef);

    if (!snapshot.exists()) {
      return {};
    }

    return {
      id: topicId,
      ...(snapshot.val() as any),
    };
  }

  static async createTestTopic(data: CreateTopicFormValue) {
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

    const result = await TopicRepository.createTestTopic(createTopic);
    return result;
  }
}
