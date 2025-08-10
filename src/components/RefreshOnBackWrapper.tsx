"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RefreshOnBackWrapperProps = {
  children: React.ReactNode;
  refreshFlagKey?: string;
};

export default function RefreshOnBackWrapper({
  children,
  refreshFlagKey = "needRefresh",
}: RefreshOnBackWrapperProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
    console.log(Date.now)
    if (sessionStorage.getItem(refreshFlagKey) === "true") {
        setIsRefreshing(true);
        sessionStorage.removeItem(refreshFlagKey);
        window.location.reload();
    }
}, [refreshFlagKey, router]);


if (isRefreshing) {
  return (
    <div className="mx-auto mt-100 h-24 w-24 animate-[spin_1.7s_linear_infinite] rounded-full border-2  border-purple-500 border-t-transparent"></div>
  );
}


  return <>{children}</>
}
