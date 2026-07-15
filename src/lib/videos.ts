export interface VimeoVideo {
  src: string;
  title: string;
  description: string;
}

/** Official InstaDoodle Vimeo embeds supplied by the project owner. */
export const VIMEO_VIDEOS = {
  sale: {
    src: "https://player.vimeo.com/video/1031062753?h=679763e772",
    title: "InstaDoodle overview video",
    description: "An official overview of the InstaDoodle workflow and the kind of whiteboard videos it is designed to create.",
  },
  demo: {
    src: "https://player.vimeo.com/video/965207353",
    title: "InstaDoodle product demo",
    description: "An official product demonstration that gives viewers a concrete look at the whiteboard-animation workflow.",
  },
  marketers: {
    src: "https://player.vimeo.com/video/949816110",
    title: "InstaDoodle marketing example",
    description: "An official example for planning a marketing message as a short doodle-video sequence.",
  },
  businessOwners: {
    src: "https://player.vimeo.com/video/949817416",
    title: "InstaDoodle business-owner example",
    description: "An official example for explaining a business offer, process, or customer problem with doodle animation.",
  },
  contentCreators: {
    src: "https://player.vimeo.com/video/949816024",
    title: "InstaDoodle content-creator example",
    description: "An official example for shaping a creator idea into a clear, reusable video format.",
  },
  nonprofits: {
    src: "https://player.vimeo.com/video/949816192",
    title: "InstaDoodle nonprofit example",
    description: "An official example for helping a nonprofit explain a mission, program, or action to supporters.",
  },
} as const satisfies Record<string, VimeoVideo>;

export type VimeoVideoKey = keyof typeof VIMEO_VIDEOS;
