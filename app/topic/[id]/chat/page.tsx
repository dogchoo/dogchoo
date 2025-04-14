import ChatArea from "@/app/topic/[id]/chat/(components)/chat-area";
import ChatHeader from "@/app/topic/[id]/chat/(components)/chat-header";

interface TopicChatPageProps {
  params: {
    id: number;
  };
}

const TopicChatPage = ({ params }: TopicChatPageProps) => {
  // TODO: 토픽 API 연결
  params.id;
  const title = "성요한 vs 장현, 둘중 누가 더 강한가?";

  return (
    <>
      <ChatHeader title={title} />
      <ChatArea />
    </>
  );
};

export default TopicChatPage;
