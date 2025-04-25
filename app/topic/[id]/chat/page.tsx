import ChatArea from "@/app/topic/[id]/chat/(components)/chat-area";
import ChatHeader from "@/app/topic/[id]/chat/(components)/chat-header";
import { apiGetLatestTopicServer } from "@/features/topic/apis/api-get-latest-topic-server";

interface TopicChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

const TopicChatPage = async ({ params }: TopicChatPageProps) => {
  const { id } = await params;
  const topic = await apiGetLatestTopicServer();

  return (
    <>
      <ChatHeader topic={topic} />
      <ChatArea topic={topic} />
    </>
  );
};

export default TopicChatPage;
