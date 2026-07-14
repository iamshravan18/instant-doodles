import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Independent InstaDoodle Guide — whiteboard animation workflows";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage({
    title: "Independent InstaDoodle Guide",
    eyebrow: "Whiteboard animation workflows",
  });
}
