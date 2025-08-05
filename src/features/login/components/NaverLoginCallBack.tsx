"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { setCookie } from "cookies-next";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { setUserInfoToStore } from "@/utils/user/setUserInfoToStore";

export default function NaverLoginCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const setSelectedPath = useNavStore((state) => state.setSelectedPath);

  useEffect(() => {
    const handleLogin = async () => {
      const accessToken = searchParams.get("accessToken");
      const isNewUser = searchParams.get("registration") === "no";

      if (!accessToken) {
        console.log("ERROR: 토큰 없음");
        return;
      }

      try {
        // 로그인
        login(accessToken, isNewUser);
        // 토큰 저장
        setCookie("accessToken", accessToken, {
          maxAge: 60 * 60,
          secure: false,
        });

        // 기존 회원인 경우 회원 정보 세팅
        if (!isNewUser) {
          await setUserInfoToStore();
        }

        // 메인 페이지로 이동
        router.replace("/");
        setSelectedPath("/today-news");
      } catch (error) {
        console.error("로그인 처리 중 오류:", error);
      }
    };

    handleLogin();
  }, [searchParams, router, login, setSelectedPath]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-purple-500 mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
        <div>로그인 중...</div>
      </div>
    </div>
  );
}
