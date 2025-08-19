import Image from "next/image";
import Link from "next/link";

export default function SignUpStepComplete() {
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
      <Link prefetch href="/recommended-news">
        <div
          className="flex justify-center rounded-full bg-purple-500 px-27 py-14 text-white"
        >
          나의 추천뉴스 보러가기 →
        </div>
      </Link>
    </div>
  );
}
