import AdminTopicDataTable from "@/app/(admin)/admin/topic/admin-topic-data-table";
import { apiGetTopicsServer } from "@/features/topic/apis/api-get-topics-server";

interface AdminTopicPageProps {
  searchParams: Promise<{ page?: number; limit?: number }>;
}

const AdminTopicPage = async ({ searchParams }: AdminTopicPageProps) => {
  const { page = 1, limit = 10 } = await searchParams;
  const { topics } = await apiGetTopicsServer({ page, limit });

  return <AdminTopicDataTable topics={topics} />;
};

export default AdminTopicPage;
