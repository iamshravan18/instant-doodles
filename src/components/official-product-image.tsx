import Image from "next/image";
import { getRemoteImage, type OfficialProductImageKey } from "@/lib/media";

export type { OfficialProductImageKey } from "@/lib/media";

interface OfficialProductImageProps {
  image: OfficialProductImageKey;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * Reserves space before an owner-supplied official visual loads. The remote
 * source is restricted in next.config.ts and is optimized by next/image.
 * Image metadata is sourced from the media registry (`@/lib/media`).
 */
export function OfficialProductImage({
  image,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 42vw, 100vw",
}: OfficialProductImageProps) {
  const asset = getRemoteImage(image);

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
