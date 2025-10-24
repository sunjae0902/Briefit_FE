"use client";

import { useEffect, useState } from "react";
import { PressCompany } from "@/types/news/pressCompany";
import PressCompanyFilterPopup from "./PressCompanyFilterPopup";
import { fetchPressCompanyListClient } from "../today-news/api/newsClient";

export default function PressCompanyFilterWrapperClient() {
  const [pressCompanyList, setPressCompanyList] = useState<PressCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPressCompanyListClient();
        setPressCompanyList(data);
      } catch (error) {
        console.error("Error fetching press company list:", error);
        setPressCompanyList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <PressCompanyFilterPopup pressCompanyList={pressCompanyList} />;
}
