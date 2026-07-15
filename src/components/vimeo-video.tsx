import { getVideo, type VimeoVideoKey } from "@/lib/media";

interface VimeoVideoProps {
  video: VimeoVideoKey;
  caption?: string;
  className?: string;
}

/**
 * A server-rendered Vimeo embed with a reserved 16:9 frame. Vimeo is only
 * requested near the viewport; no embed receives autoplay parameters.
 * All video metadata is sourced from the media registry (`@/lib/media`).
 */
export function VimeoVideo({ video, caption, className = "" }: VimeoVideoProps) {
  const item = getVideo(video);

  return (
    <figure className={`overflow-hidden rounded-2xl border-2 border-ink bg-ink shadow-[var(--shadow-hard-lavender)] ${className}`}>
      <div className="relative aspect-video bg-ink">
        <iframe
          src={item.embedUrl}
          title={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="border-t-2 border-ink bg-card px-5 py-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet">Official video</p>
        <p className="mt-1 text-sm text-muted">{caption ?? item.description}</p>
      </figcaption>
    </figure>
  );
}
