import { Button } from "@/components/ui/button";
import { TopicListItem } from "@/features/topic/model/types/topic-list-item";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const ChatHeader = ({ topic }: { topic: TopicListItem }) => {
  const { title, isDone } = topic;

  return (
    <div className="fixed top-0 left-1/2 z-10 w-full -translate-x-1/2 justify-center border-b bg-white py-2 pt-3 dark:bg-black">
      <div className="relative">
        <Link
          href="/"
          className="cursor-pointer"
        >
          <Button
            className="absolute top-2 left-2"
            variant="ghost"
          >
            <ChevronLeftIcon className="size-8" />
          </Button>
        </Link>

        {isDone ? (
          <div className="flex w-full justify-center">
            <div className="rounded-md bg-zinc-600 p-1 px-2 text-xs text-white">닫힌 주제</div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center">주제</p>
        )}

        <p className="text-center text-2xl">{title}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
