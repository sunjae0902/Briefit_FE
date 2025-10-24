import Link from "next/link";
import Image from "next/image";
import { loginRedirectURL } from "@/constants/.loginRedirectURL";

export default function NaverLoginButton() {
    return (
      <Link prefetch={true} href={loginRedirectURL}>
        <Image src={"/assets/naver-login-btn.png"} alt="로그인" width={305} height={58}/>
      </Link>
    );
}
