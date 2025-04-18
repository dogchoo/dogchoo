const ChatHeader = ({ title }: { title: string }) => {
  return (
    <div className="fixed top-0 left-1/2 z-10 w-full -translate-x-1/2 bg-white pt-3">
      <p className="text-muted-foreground text-center">오늘의 주제</p>
      <p className="text-center text-2xl">{title}</p>
    </div>
  );
};

export default ChatHeader;
