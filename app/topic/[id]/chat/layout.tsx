import { ReactNode } from "react";

const TopicChatLayout = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto flex h-full flex-col">{children}</div>;
};

export default TopicChatLayout;
