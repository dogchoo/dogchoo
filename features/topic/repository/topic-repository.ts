import { CreateTopicCommend, ITopicRepository, UpdateTopicCommend } from "@/features/topic/repository/interface";
import type { DocumentReference, Firestore } from "firebase-admin/firestore";

export class TopicRepository implements ITopicRepository {
  constructor(private db: Firestore) {}

  async pushTopic(data: CreateTopicCommend): Promise<DocumentReference> {
    throw new Error("Method not implemented.");
  }
  async findAll?(): Promise<number[]> {
    throw new Error("Method not implemented.");
  }
  async findById?(id: string): Promise<number | null> {
    throw new Error("Method not implemented.");
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
