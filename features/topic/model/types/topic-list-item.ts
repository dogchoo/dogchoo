export interface TopicListItem {
  title: string;
  content: string;
  isDone: boolean;
  created: string;
  id: string;
}

export interface PaginatedTopicResult {
  topics: TopicListItem[];
  nextCursor: string | null;
}
