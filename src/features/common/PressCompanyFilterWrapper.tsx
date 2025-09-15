import { fetchPressCompanyList } from "../today-news/api/news";
import PressCompanyFilterPopup from "./PressCompanyFilterPopup";

export default async function PressCompanyFilterWrapper() {
  const pressCompanyList = await fetchPressCompanyList();

  return <PressCompanyFilterPopup pressCompanyList={pressCompanyList} />;
}
