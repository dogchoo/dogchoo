import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const ChatHeader = ({ title }: { title: string }) => {
  return (
    <div className="fixed top-0 left-1/2 z-10 w-full -translate-x-1/2 justify-center bg-white pt-3">
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
        <p className="text-muted-foreground text-center">주제</p>
        <p className="text-center text-2xl">{title}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
