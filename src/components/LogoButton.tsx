import { navItems } from "@/constants/navItems";
import Image from "next/image";
import Link from "next/link";

export default function LogoButton({
  width,
  height,
  onClick,
}: {
  width: number;
  height: number;
  onClick?: () => void;
}) {
  return (
    <Link
      prefetch
      href={navItems[0].path}
      onClick={onClick}
    >
      <Image
        src="/assets/logo.png"
        alt="Breifit"
        width={width}
        height={height}
      />
    </Link>
  );
}
