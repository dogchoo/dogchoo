import { MessageRepository } from "@/features/message/repository/message-repository";
import { IMessageService } from "@/features/message/service/interface";
import { MessageService } from "@/features/message/service/message-service";
import { db } from "@/libs/firebase";

interface Container {
  messageService: IMessageService;
}

const messageRepository = new MessageRepository(db);

export const container: Container = {
  messageService: new MessageService(messageRepository),
};
