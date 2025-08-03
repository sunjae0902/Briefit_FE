import { Button } from "@/components/ui/button";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUpStepComplete() {
  const router = useRouter();
  const setSelectedPath = useNavStore((state) => state.setSelectedPath);
  return (
    <div className="mt-178 mb-179 flex flex-col items-center justify-center">
      <Image
        src="/assets/signup-success.png"
        alt="success"
        width={90}
        height={90}
      />
      <p className="mt-20 font-semibold">회원가입이</p>
      <p className="mb-45 font-semibold">완료되었습니다.</p>
      <Button
        className="flex justify-center rounded-full bg-purple-500 px-27 py-22 text-white"
        onClick={() => {
          router.push("/recommended-news");
          setSelectedPath("/recommended-news");
        }}
      >
        나의 추천뉴스 보러가기 →
      </Button>
    </div>
  );
}
