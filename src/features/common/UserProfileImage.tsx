"use client";

import { useUserStore } from "@/stores/auth/useUserStore";
import ResponsiveImage from "./ResponsiveImage";

export default function UserProfileImage() {
  const profileUrl = useUserStore((state) => state.profileUrl);
  if (!profileUrl) {
    return <div className="mb-5 h-50 w-50 rounded-full bg-gray-100" />;
  }
  return (
    <ResponsiveImage
      src={profileUrl}
      alt="프로필 이미지"
      rounded="full"
      ratio={1}
      className="h-50 w-50"
    ></ResponsiveImage>
  );
}
