"use client";

import { useState, useEffect } from "react";
import SignUpStepInfo from "./SignUpStepInfo";
import SignUpStepCategory from "./SignUpStepCategory";
import SignUpStepComplete from "./SignUpStepComplete";
import SignUpStepsIcons from "./SignUpStepsIcons";
import { X } from "lucide-react";
import { useSignUpStore } from "@/stores/signup/useSignUpStore";
import registerUser from "../api/signup";
import convertAssetToFile from "@/utils/image/convertAssetToFile";
import { setUserInfoToStore } from "@/utils/user/setUserInfoToStore";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpModal({ open, onClose }: SignUpModalProps) {
  const [step, setStep] = useState(0);

  const name = useSignUpStore((state) => state.name);
  const categories = useSignUpStore((state) => state.categories);
  const profileImageFile = useSignUpStore((state) => state.profileImageFile);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const handleRegister = async () => {
    await registerUser(
      name,
      categories,
      profileImageFile ?? (await convertAssetToFile({ path: "" })),
    );

    await setUserInfoToStore(); // 유저 정보 세팅

    setStep(2); // 완료 단계로 이동
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 sm:bg-white">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-35 shadow-xl sm:h-full sm:max-w-none sm:rounded-none sm:shadow-none">
        <X
          onClick={onClose}
          strokeWidth={1.5}
          color="gray"
          className="absolute top-20 right-20 size-20 sm:size-28"
        />

        {step === 2 ? (
          <SignUpStepComplete />
        ) : (
          <div className="flex flex-col items-center justify-center sm:justify-start">
            <h2 className="my-30 font-title-24-m">
              회원 가입
            </h2>
            <SignUpStepsIcons currentStep={step} />
            {step === 0 && <SignUpStepInfo onNext={() => setStep(1)} />}
            {step === 1 && (
              <SignUpStepCategory
                onPrev={() => setStep(0)}
                onNext={handleRegister}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
