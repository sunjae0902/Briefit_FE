import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { DetailPageType } from "@/constants/detailPageType";

export function MoreCardButton({
  type,
  categoryLabel,
  className,
}: {
  type: DetailPageType;
  categoryLabel: string;
  className?: string;
}) {
  return (
    <Link href={`${type}/${categoryLabel}`}>
      <Card
        className={`${className ?? ""} rounded-20 h-full bg-gray-50 p-20 shadow-[0_0_3px_#D9D9D9]`}
      >
        <CardContent className="flex h-full items-center justify-center">
          <div className="font-title-24 text-center text-gray-500">더보기</div>
        </CardContent>
      </Card>
    </Link>
  );
}
