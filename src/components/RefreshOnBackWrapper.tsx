 "use client";

 import { useEffect, useState } from "react";
 import { useRouter, usePathname } from "next/navigation";
 import { useNavStore } from "@/stores/navigation/useNavStrore";
import LoadingSpinner from "./LoadingSpinner";

 type RefreshOnBackWrapperProps = {
   children: React.ReactNode;
   refreshFlagKey?: string;
 };

 export default function RefreshOnBackWrapper({
   children,
   refreshFlagKey = "needRefresh",
 }: RefreshOnBackWrapperProps) {
   const router = useRouter();
   const pathname = "/" + usePathname().split("/")[1]; // 현재 메뉴 경로
const [isRefreshing, setIsRefreshing] = useState(false);
 const selectedPath = useNavStore((state) => state.selectedPath);
   const setSelectedPath = useNavStore((state) => state.setSelectedPath);

   useEffect(() => {
     if (pathname && selectedPath !== pathname) {
       setSelectedPath(pathname);
     }
   }, []);

   useEffect(() => {
     if (sessionStorage.getItem(refreshFlagKey) === "true") {
       setIsRefreshing(true);
       sessionStorage.removeItem(refreshFlagKey);
       window.location.reload();
     }
   }, [refreshFlagKey, router]);

   if (isRefreshing) {
     return <LoadingSpinner/>
   }

   return <>{children}</>;
 }
