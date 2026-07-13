/** Central metadata for local, product-only official visuals.
 *  Source URLs and rights notes are tracked in docs/official-asset-sources.md. */
export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const B = "/images/instadoodle";

export const MEDIA = {
  heroEditor: { src: `${B}/ai-doodle-generator-editor.webp`, width: 1473, height: 631, alt: "InstaDoodle editor showing doodle scenes, a drawing hand and a scene timeline" },
  sceneEditor: { src: `${B}/features/instadoodle-scene-editor-interface.webp`, width: 1000, height: 833, alt: "InstaDoodle scene editor interface with a doodle canvas and editing controls" },
  library: { src: `${B}/features/instadoodle-doodle-asset-library.webp`, width: 1000, height: 561, alt: "InstaDoodle searchable doodle library of characters, arrows and elements" },
  imageToSketch: { src: `${B}/features/instadoodle-ai-image-to-sketch-panel.webp`, width: 1000, height: 561, alt: "InstaDoodle AI image-to-sketch panel turning an uploaded photo into a hand-drawn doodle" },
  imageToSketchAlt: { src: `${B}/image-to-sketch-feature.webp`, width: 301, height: 226, alt: "Before-and-after of a photo redrawn as an InstaDoodle sketch" },
  hands: { src: `${B}/features/instadoodle-drawing-hand-styles.webp`, width: 1000, height: 833, alt: "InstaDoodle drawing-hand style options" },
  voiceover: { src: `${B}/features/instadoodle-voiceover-and-music.webp`, width: 1000, height: 833, alt: "InstaDoodle voiceover and background music panel" },
  transitions: { src: `${B}/features/instadoodle-slide-transitions.webp`, width: 1000, height: 833, alt: "InstaDoodle slide transition options between doodle scenes" },
  animationTypes: { src: `${B}/features/instadoodle-animation-types.webp`, width: 1000, height: 833, alt: "InstaDoodle scene reveal animation types" },
  aspectRatios: { src: `${B}/features/instadoodle-aspect-ratios.webp`, width: 1000, height: 833, alt: "InstaDoodle aspect ratio options for landscape, portrait and square video" },
  artStyles: { src: `${B}/features/instadoodle-ai-art-styles.webp`, width: 1000, height: 561, alt: "InstaDoodle AI art styles including caricature, cartoon and realistic" },
  templates: { src: `${B}/features/instadoodle-starter-templates.webp`, width: 1000, height: 833, alt: "InstaDoodle starter project templates" },
  adjustments: { src: `${B}/features/instadoodle-advanced-adjustments.webp`, width: 1000, height: 833, alt: "InstaDoodle advanced background adjustment controls" },
  cloud: { src: `${B}/features/instadoodle-cloud-based-editor.webp`, width: 1000, height: 833, alt: "InstaDoodle cloud-based editor running in a browser across devices" },
  doodleAi: { src: `${B}/doodle-ai-feature.webp`, width: 337, height: 231, alt: "Doodle-style character and video playback illustration from InstaDoodle" },
  whyWhiteboard: { src: `${B}/why-whiteboard-animation.webp`, width: 669, height: 392, alt: "Whiteboard video illustrations for marketing, learning and business communication" },
  whyDoodle: { src: `${B}/why-doodle-animation.webp`, width: 448, height: 443, alt: "Teacher using a whiteboard animation to explain a math lesson" },
  sampleBrand: { src: `${B}/samples/instadoodle-sample-brand-story.webp`, width: 800, height: 450, alt: "Brand story doodle scene created with InstaDoodle" },
  sampleKids: { src: `${B}/samples/instadoodle-sample-kids-lesson.webp`, width: 800, height: 450, alt: "Children's lesson doodle scene created with InstaDoodle" },
} as const satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof MEDIA;
