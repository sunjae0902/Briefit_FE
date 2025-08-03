export type NewsDetailProps = {
  searchParams: Promise<{
    articleId: string;
    scrapId?: string;
    customId?: string;
  }>;
};
