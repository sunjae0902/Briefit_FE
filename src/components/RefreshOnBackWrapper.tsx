 "use client";

 import { useEffect, useState } from "react";
 import { useRouter, usePathname } from "next/navigation";
 import { useNavStore } from "@/stores/navigation/useNavStrore";

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
     return (
       <div className="mx-auto mt-100 h-24 w-24 animate-[spin_1.7s_linear_infinite] rounded-full border-2 border-purple-500 border-t-transparent"></div>
     );
   }

   return <>{children}</>;
 }
