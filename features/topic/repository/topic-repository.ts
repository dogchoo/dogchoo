import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { CreateTopicCommend, ITopicRepository, UpdateTopicCommend } from "@/features/topic/repository/interface";
import type { Firestore, Timestamp } from "firebase-admin/firestore";

export class TopicRepository implements ITopicRepository {
  constructor(private db: Firestore) {}

  async findAll(): Promise<TopicListItem[]> {
    const snapshot = await this.db.collection("topics").get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.title,
        content: data.content,
        isDone: data.isDone,
        created: (data.created as Timestamp).toDate().toISOString(),
      };
    });
  }

  async findById(id: string): Promise<TopicListItem | null> {
    const doc = await this.db.collection("topics").doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    if (!data) return null;

    return {
      ...data,
      created: (data.created as Timestamp).toDate().toISOString(), // 파이어스토어에 저장된 timestamp를 string으로변환
    } as TopicListItem;
  }

  async create(data: CreateTopicCommend): Promise<string | void> {
    const docRef = await this.db.collection("topics").add(data);

    return docRef.id;
  }
  async update(data: UpdateTopicCommend): Promise<void> {
    await this.db.collection("topics").doc(data.id).update(data);
  }
  async delete(id: string): Promise<void> {
    await this.db.collection("topics").doc(id).delete();
  }
}
