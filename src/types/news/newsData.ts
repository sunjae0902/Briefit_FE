import { HighlightInfo } from "../custom/highlightInfo";

export type NewsSource = {
  sourceTitle: string;
  pressCompany: string;
  url: string;
}

export type NewsData = {
  articleId: number;
  scrapId: number | null;
  customId: number | null;
  title: string;
  body: string;
  categories: string[]; 
  sources: NewsSource[];
  imgUrls: string[];
  backgroundColor: string | null;
  customs: HighlightInfo[];
  createdAt: string;
}
