import KakaoAdFit from "@/components/kakao-ad/KakaoAdFit";
import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import RecommendedNews from "@/features/recommended-news/components/RecommendedNews";

export default function RecommendedNewsPage() {  
  return (
    <div className="relative">
      {/* 사이드 광고 (세로) */}
      <div className="absolute top-100 -left-190 sm:hidden">
        <KakaoAdFit unitId="DAN-BzGGqp2CtLaw0jx1" width={160} height={600} />
      </div>
      <div className="space-y-14 sm:p-20">
        <div className="font-title-24 sm:hidden">나의 추천 뉴스</div>
        <div className="font-title-20 pc:hidden">나의 추천 뉴스</div>
        <RefreshOnBackWrapper>
          <RecommendedNews />
        </RefreshOnBackWrapper>
      </div>
    </div>
  );
}
