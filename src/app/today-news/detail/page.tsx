import NewsDetail from "@/features/detail/components/NewsDetail";
import { NewsDetailProps } from "@/types/news/newsDetailProps";

export default async function TodayNewsDetailPage({ searchParams }: NewsDetailProps) {
  const { articleId, scrapId, customId } = await searchParams;
 
  return (
    <NewsDetail
      articleId={Number(articleId)}
      scrapId={scrapId === "null" ? null : Number(scrapId)}
      customId={customId === "null" ? null : Number(customId)}
      containsAuthHeader={false}
    />
  );
}
