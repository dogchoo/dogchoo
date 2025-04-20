import { MessageRepository } from "@/features/message/repository/message-repository";
import { IMessageService } from "@/features/message/service/interface";
import { MessageService } from "@/features/message/service/message-service";
import { TopicRepository } from "@/features/topic/repository/topic-repository";
import { ITopicService } from "@/features/topic/service/interface";
import { TopicService } from "@/features/topic/service/topic-service";
import { db } from "@/libs/firebase";
import { adminDb } from "@/libs/firebase-admin";

interface Container {
  messageService: IMessageService;
  topicService: ITopicService;
}

const messageRepository = new MessageRepository(db);
const topicRepository = new TopicRepository(adminDb);

export const container: Container = {
  messageService: new MessageService(messageRepository),
  topicService: new TopicService(topicRepository),
};
