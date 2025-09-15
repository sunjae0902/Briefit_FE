import { HighlightInfo } from "../custom/highlightInfo";
import { NewsSource } from "./newsData";

export type CustomizedNewsData = {
  scrapId: number;
  title: string;
  body: string;
  categories: string[];
  sources: NewsSource[];
  imgUrls: string[];
  backgroundColor: string;
  fontSize: number;
  fontColor: string;
  customs: HighlightInfo[];
  createdAt: string;
};
