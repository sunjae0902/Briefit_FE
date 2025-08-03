export type NewsSummary = {
  articleId: number;
  scrapId: number | null;
  customId: number | null;
  title: string;
  body: string;
  categories: string[];
  pressCompanies: string[];
  imgUrls: string[];
  backgroundColor: string | null;
  createdAt: string;
};
