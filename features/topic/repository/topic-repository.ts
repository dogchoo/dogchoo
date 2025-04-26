import { PaginatedTopicResult, TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { CreateTopicCommend, ITopicRepository, UpdateTopicCommend } from "@/features/topic/repository/interface";
import type { Firestore, Timestamp } from "firebase-admin/firestore";

export class TopicRepository implements ITopicRepository {
  constructor(private db: Firestore) {}

  async findAll(): Promise<TopicListItem[]> {
    const snapshot = await this.db.collection("topics").get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        isDone: data.isDone,
        created: (data.created as Timestamp).toDate().toISOString(),
        startDate: (data.startDate as Timestamp).toDate().toISOString(),
      };
    });
  }

  async findByPage(page = 1, limit = 10): Promise<PaginatedTopicResult> {
    let query = this.db.collection("topics").orderBy("created", "desc").limit(limit);

    // page > 1이면 cursor를 계산
    if (page > 1) {
      const offset = (page - 1) * limit;

      const offsetSnapshot = await this.db.collection("topics").orderBy("created", "desc").limit(offset).get();

      const lastDoc = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
      if (lastDoc) {
        query = query.startAfter(lastDoc.data().created.toDate());
      }
    }

    const snapshot = await query.get();

    const topics: TopicListItem[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        content: data.content,
        title: data.title,
        isDone: data.isDone,
        created: (data.created as Timestamp).toDate().toISOString(),
        startDate: (data.startDate as Timestamp).toDate().toISOString(),
      };
    });

    const last = snapshot.docs[snapshot.docs.length - 1];
    const nextCursor = last ? (last.data().created as Timestamp).toDate().toISOString() : null;

    return { topics, nextCursor };
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

  async findLatest(): Promise<TopicListItem | null> {
    const snapshot = await this.db.collection("topics").orderBy("created", "desc").limit(1).get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      isDone: data.isDone,
      created: (data.created as Timestamp).toDate().toISOString(),
      startDate: (data.startDate as Timestamp).toDate().toISOString(),
    } as TopicListItem;
  }

  async getTodayTopic(startOfToday: Date, endOfToday: Date): Promise<TopicListItem[]> {
    const snapshot = await this.db.collection("topics").where("startDate", ">=", startOfToday.toISOString()).where("startDate", "<=", endOfToday.toISOString()).get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        isDone: data.isDone,
        created: (data.created as Timestamp).toDate().toISOString(),
        startDate: data.startDate,
      } as TopicListItem;
    });
  }
}
