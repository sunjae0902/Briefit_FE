import { useEffect } from "react";
import NaverLoginButton from "../NaverLoginButton";
import LogoButton from "@/components/LogoButton";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function MobileLoginPopup({ onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-hidden bg-white opacity-100 transition-opacity duration-200 ease-out">
      <X
        onClick={onClose}
        strokeWidth={1.5}
        color="gray"
        className="absolute top-20 right-20 size-28"
      />
      <div className="flex transform flex-col items-center opacity-100 transition-transform duration-200 ease-out">
        <div className="mt-140 mb-100">
          <LogoButton width={130} height={45} />
        </div>
        <div className="mb-30 text-center font-basic-16">
          네이버 로그인을 통해
          <br />
          편리하게 로그인 하세요!
        </div>
        <NaverLoginButton />
      </div>
    </div>
  );
}
