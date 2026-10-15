import Image from "next/image";
import { BRAND, IMAGES } from "./content";
import MethodologySteps from "./methodology-steps";
import { BrandMark } from "./ui";

export default function Methodology() {
  const photo = IMAGES.mentor;

  return (
    <section
      id="metodologia"
      aria-label="Metodología"
      className="mx-auto mt-24 grid w-full max-w-[1300px] scroll-mt-6 gap-[26px] lg:grid-cols-[44fr_56fr]"
    >
      {/* Foto del instructor */}
      <div className="relative min-h-[460px] overflow-hidden rounded-[22px] bg-[#C0ACDF] lg:min-h-[560px]">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute left-7 top-[26px] flex items-center gap-[9px] text-white opacity-[0.55]">
          <BrandMark tone="ghost" className="size-7 rounded-lg" />
          <span className="text-[22px] font-medium tracking-[-0.02em]">{BRAND}</span>
        </div>
      </div>

      <MethodologySteps />
    </section>
  );
}
