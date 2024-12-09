import headerKV from "@/assets/landing-page/HeaderKV.png";
import heroSectionStar from "@/assets/landing-page/hero-section-star.png";

export default function HeroSectionBg() {
  return (
    <div className="h-full w-full relative">
      <img src={headerKV} className="h-full animate-sky min-h-[1006px]" />
      <img
        src={heroSectionStar}
        className="absolute w-[570px] h-[570px] top-[20%] z-10 right-[12%] animate-star"
      />
    </div>
  );
}
