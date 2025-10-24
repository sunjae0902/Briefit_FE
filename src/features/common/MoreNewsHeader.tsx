import { ChevronRight } from "lucide-react";
import PressCompanyFilterWrapper from "./PressCompanyFilterWrapper";

export function MoreNewsHeader({
  title,
  categoryLabel,
}: {
  title: string;
  categoryLabel?: string | null;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex w-fit cursor-pointer items-center font-title-20 pc:hidden">
        {title}
        {categoryLabel && (
          <>
            <ChevronRight className="text-gray-400" /> {categoryLabel}
          </>
        )}
      </div>
      <PressCompanyFilterWrapper/>
    </div>
  );
}
