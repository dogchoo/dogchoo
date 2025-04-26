import { apiGetTopicServer } from "@/features/topic/apis/api-get-topic-server";
import TopicHistoryCarousel from "@/features/topic/ui/topic-history/topic-history-carousel";
import { HistoryIcon } from "lucide-react";

const TopicHistory = async () => {
  const topics = await apiGetTopicServer({ limit: 10 });

  return (
    <div className="w-full max-w-[480px]">
      <div className="flex w-full items-center justify-center gap-2">
        <HistoryIcon className="size-4" />
        <p>이전 토론 주제</p>
      </div>

      <TopicHistoryCarousel topics={topics} />
    </div>
  );
};

export default TopicHistory;
