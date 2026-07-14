import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage({
  title,
  eyebrow = "Independent product guide",
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f8f7f8",
          color: "#0f0f10",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "68px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "#c709a3",
              borderRadius: "999px",
              height: "18px",
              width: "18px",
            }}
          />
          <span
            style={{
              color: "#621cda",
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "950px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ background: "#621cda", height: "12px", width: "240px" }} />
            <div style={{ background: "#c709a3", height: "12px", width: "72px" }} />
          </div>
        </div>
        <div
          style={{
            color: "#5d5960",
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          Independent InstaDoodle Guide · whiteboard animation workflows
        </div>
      </div>
    ),
    socialImageSize,
  );
}
