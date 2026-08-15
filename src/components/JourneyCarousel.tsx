import { ImageIcon } from "lucide-react";
import foto1 from "@/assets/marcos_21_1.jpg.asset.json";
import foto2 from "@/assets/img_6731_1.jpg.asset.json";
import foto3 from "@/assets/fullsize.jpg.asset.json";
import foto4 from "@/assets/img_8085.jpg.asset.json";
import foto5 from "@/assets/img_8268.jpg.asset.json";

export const journeyImages: { src: string }[] = [
  { src: foto1.url },
  { src: foto2.url },
  { src: foto3.url },
  { src: foto4.url },
  { src: foto5.url },
];

const JourneyCarousel = () => {
  const total = journeyImages.length;

  if (total === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-border bg-surface aspect-[16/9] flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <ImageIcon size={40} strokeWidth={1.2} />
        <p className="text-sm px-6 text-center">
          Importe suas fotos para iniciar o looping da jornada
        </p>
      </div>
    );
  }

  const loop = [...journeyImages, ...journeyImages];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <style>{`
        @keyframes journey-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex w-max items-center gap-4 sm:gap-6"
        style={{ animation: "journey-scroll 45s linear infinite" }}
      >
        {loop.map((img, i) => (
          <img
            key={`${img.src}-${i}`}
            src={img.src}
            alt={`Jornada 29Tech ${(i % total) + 1}`}
            loading={i < total ? "eager" : "lazy"}
            className="h-[200px] sm:h-[300px] w-auto max-w-none rounded-[20px] object-contain bg-surface"
          />
        ))}
      </div>
    </div>
  );
};

export default JourneyCarousel;
