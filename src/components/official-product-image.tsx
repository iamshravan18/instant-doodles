import Image from "next/image";
import { OFFICIAL_ASSET_SOURCES, type OfficialProductImageKey } from "@/lib/assets";

export type { OfficialProductImageKey } from "@/lib/assets";

const IMAGES: Record<OfficialProductImageKey, { src: string; aspectRatio: string }> = {
  join: { src: OFFICIAL_ASSET_SOURCES.join, aspectRatio: "4 / 3" },
  box: { src: OFFICIAL_ASSET_SOURCES.box, aspectRatio: "4 / 3" },
  option: { src: OFFICIAL_ASSET_SOURCES.option, aspectRatio: "4 / 3" },
};

interface OfficialProductImageProps {
  image: OfficialProductImageKey;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * Reserves space before an owner-supplied official visual loads. The remote
 * source is restricted in next.config.ts and is optimized by next/image.
 */
export function OfficialProductImage({
  image,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 42vw, 100vw",
}: OfficialProductImageProps) {
  const asset = IMAGES[image];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-[var(--shadow-hard-lavender)] ${className}`}
      style={{ aspectRatio: asset.aspectRatio }}
    >
      <Image
        src={asset.src}
        alt={alt}
        fill
        sizes={sizes}
        quality={75}
        loading="lazy"
        className="object-contain p-3"
      />
    </div>
  );
}
