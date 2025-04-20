export interface TopicListItem {
  title: string;
  content: string;
  isDone: boolean;
  created: string;
  // message: Record<string, MessageListItem>;
}

export interface PaginatedTopicResult {
  topics: TopicListItem[];
  nextCursor: string | null;
}
