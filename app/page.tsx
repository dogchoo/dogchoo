import { Button } from "@/components/ui/button";
import { apiGetLatestTopicServer } from "@/features/topic/apis/api-get-latest-topic-server";
import TopicHistory from "@/features/topic/ui/topic-history";
import { getTimeLeft } from "@/libs/utils";
import Logo from "@/public/images/logo.png";
import { MessageCircleMoreIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
  const latestTopic = await apiGetLatestTopicServer();
  const today = new Date();

  const timeLeft = getTimeLeft();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px]">
        <Image
          src={Logo}
          alt=""
          width={148}
          height={148}
          style={{
            borderRadius: 20,
          }}
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="w-full space-y-2 rounded-xl border-2 p-6 text-center">
            <p className="text-muted-foreground">오늘의 주제</p>
            <p className="text-xl">{latestTopic.title}</p>

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

        <div>
          <TopicHistory />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
