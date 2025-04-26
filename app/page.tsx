import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContenderCard from "@/features/contender/ui/contender-card";
import { apiGetLatestTopicServer } from "@/features/topic/apis/api-get-latest-topic-server";
import TopicHistory from "@/features/topic/ui/topic-history";
import { getTimeLeft } from "@/libs/utils";
import { MessageCircleMoreIcon } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  const latestTopic = await apiGetLatestTopicServer();
  const timeLeft = getTimeLeft();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex w-full flex-col items-center gap-[32px]">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="w-full space-y-2 rounded-xl text-center">
            <div>
              <p className="text-muted-foreground">오늘의 주제</p>
              <p className="text-2xl">{latestTopic.title}</p>
            </div>

            <Separator className="relative my-4"></Separator>

            <div className="flex items-center justify-center gap-x-6 rounded-lg">
              <ContenderCard
                contender={{
                  title: "종건",
                  description: "시로오니",
                  path: "whdrjs.png",
                }}
              />
              <p>VS</p>
              <ContenderCard
                contender={{
                  title: "김기태",
                  description: "김갑룡의 아들",
                  path: "rlarlxo.png",
                }}
              />
            </div>

            <Button
              size="lg"
              className="mt-6 h-fit w-full py-2"
            >
              <Link
                href={`/topic/${latestTopic.id}/chat`}
                className="space-y-1"
              >
                <div className="flex items-center gap-2">
                  <MessageCircleMoreIcon />
                  <p>오늘의 주제 참여하기</p>
                </div>
                <p className="text-xs underline underline-offset-2">남은시간: {timeLeft}</p>
              </Link>
            </Button>
          </div>
        </div>

        <TopicHistory />
      </main>
    </div>
  );
};

export default HomePage;
