"use client";

import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  ratio?: number; // 예: 710 / 470 = 1.51...
  className?: string;
  priority?: boolean;
  rounded?: string;
}

export default function ResponsiveImage({
  src,
  alt,
  ratio = 16 / 9,
  className = "",
  priority = false,
  rounded,
}: ResponsiveImageProps) {
  const aspectRatioStyle = {
    aspectRatio: `${ratio}`,
  };

  const roundedClass =
    rounded === "none" ? "rounded-none" : `rounded-${rounded}`;

  return (
    <div className={`relative ${className}`} style={aspectRatioStyle}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`${roundedClass} block object-cover object-center`}
        priority={priority}
        unoptimized // 추후 수정
      />
    </div>
  );
}
