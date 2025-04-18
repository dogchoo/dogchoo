import { ReactNode } from "react";

const TopicChatLayout = ({ children }: { children: ReactNode }) => {
  return <div className="relative container mx-auto flex h-full max-w-[1048px] flex-col">{children}</div>;
};

export default TopicChatLayout;
