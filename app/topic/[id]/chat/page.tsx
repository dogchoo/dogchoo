import ChatArea from "@/app/topic/[id]/chat/(components)/chat-area";
import ChatHeader from "@/app/topic/[id]/chat/(components)/chat-header";

interface TopicChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DUMMY_TOPIC_ID = "-ONotQKeN3KuzBiMwepj";

const TopicChatPage = async ({ params }: TopicChatPageProps) => {
  // TODO: 토픽 API 연결

  const { id } = await params;

  const title = "성요한 vs 장현, 둘중 누가 더 강한가?";

  return (
    <>
      <ChatHeader title={title} />
      <ChatArea topicId={DUMMY_TOPIC_ID} />
    </>
  );
};

export default TopicChatPage;
