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
  const { title, isDone } = await apiGetLatestTopicServer();

  return (
    <>
      <ChatHeader title={title} />
      <ChatArea
        topicId={id}
        isDone={isDone}
      />
    </>
  );
};

export default TopicChatPage;
