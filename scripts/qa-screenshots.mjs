// QA screenshot + viewport-diagnostics + horizontal-overflow audit.
// Deterministic capture: fixed viewport, deviceScaleFactor 1, reduced motion,
// fonts + images awaited, lazy images forced via autoscroll, dev overlay hidden.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.QA_BASE || "http://127.0.0.1:3123";
const OUT = path.resolve("docs/qa-screenshots");
fs.mkdirSync(OUT, { recursive: true });

// name -> route
const SHOTS = [
  ["home", "/"],
  ["features", "/features"],
  ["use-cases", "/use-cases"],
  ["alternatives", "/alternatives"],
  ["comparison-doodly", "/alternatives/doodly"],
  ["comparison-videoscribe", "/alternatives/videoscribe"],
  ["comparison-animaker", "/alternatives/animaker"],
  ["samples", "/samples"],
  ["resources", "/resources"],
  ["whiteboard-animation-software", "/whiteboard-animation-software"],
];

// Full route list for the overflow audit.
const ALL_ROUTES = [
  "/", "/features", "/use-cases", "/alternatives", "/resources",
  "/whiteboard-animation-software", "/ai-whiteboard-animation", "/doodle-video-creator",
  "/whiteboard-video-maker", "/educational-video-maker", "/training-video-software",
  "/whiteboard-animation-examples", "/alternatives/doodly", "/alternatives/videoscribe",
  "/alternatives/animaker", "/samples", "/pricing", "/about", "/contact", "/privacy", "/terms",
];
const AUDIT_WIDTHS = [1440, 1024, 768, 430, 390, 375];

const HIDE_DEV_OVERLAY = `
  nextjs-portal, [data-nextjs-toolbar], #__next-build-watcher,
  [data-nextjs-dialog-overlay], [data-next-badge-root], [data-nextjs-dev-tools-button]
  { display: none !important; visibility: hidden !important; }
`;

function pngSize(buf) {
  // PNG IHDR: width at byte 16, height at byte 20 (big-endian).
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

async function gotoRetry(page, url, opts) {
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      return await page.goto(url, opts);
    } catch (e) {
      lastErr = e;
      await page.waitForTimeout(800 * attempt);
    }
  }
  throw lastErr;
}

async function settle(page) {
  await page.addStyleTag({ content: HIDE_DEV_OVERLAY }).catch(() => {});
  // Autoscroll to trigger lazy images, then back to top.
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += window.innerHeight;
        if (y < document.body.scrollHeight) requestAnimationFrame(step);
        else res();
      };
      step();
    });
    window.scrollTo(0, 0);
    await document.fonts.ready;
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((r) => { img.onload = img.onerror = r; }))),
    );
  });
  await page.waitForTimeout(400);
}

async function diag(page, requested) {
  return page.evaluate((requested) => ({
    requested,
    innerWidth: window.innerWidth,
    outerWidth: window.outerWidth,
    devicePixelRatio: window.devicePixelRatio,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }), requested);
}

const results = { shots: [], overflow: [] };

const browser = await chromium.launch();

async function capture(name, route, width, height) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await gotoRetry(page, BASE + route, { waitUntil: "load", timeout: 90000 });
  await settle(page);
  const d = await diag(page, width);
  const buf = await page.screenshot({ fullPage: true });
  const file = path.join(OUT, `${name}-${width}.png`);
  fs.writeFileSync(file, buf);
  const size = pngSize(buf);
  results.shots.push({ name, route, ...d, file: path.relative(process.cwd(), file), pngWidth: size.width, pngHeight: size.height });
  console.log(`shot ${name}-${width}: inner=${d.innerWidth} outer=${d.outerWidth} dpr=${d.devicePixelRatio} png=${size.width}x${size.height} overflowX=${d.overflowX}`);
  await context.close();
}

// 1) Required screenshots at 1440 and 390.
for (const [name, route] of SHOTS) {
  await capture(name, route, 1440, 900);
  await capture(name, route, 390, 844);
}

// 2) Mobile navigation open-state.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  await gotoRetry(page, BASE + "/", { waitUntil: "load", timeout: 90000 });
  await settle(page);
  await page.click('button[aria-controls="mobile-nav"]');
  await page.waitForTimeout(500);
  const buf = await page.screenshot({ fullPage: false });
  fs.writeFileSync(path.join(OUT, "mobile-nav-open-390.png"), buf);
  const size = pngSize(buf);
  results.shots.push({ name: "mobile-nav-open", route: "/", requested: 390, pngWidth: size.width, pngHeight: size.height });
  console.log(`shot mobile-nav-open-390: png=${size.width}x${size.height}`);
  await context.close();
}

// 3) Comparison-table mobile state (stacked cards) — focused capture.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  await gotoRetry(page, BASE + "/alternatives/doodly#summary", { waitUntil: "load", timeout: 90000 });
  await settle(page);
  const el = await page.$("#summary");
  if (el) {
    const buf = await el.screenshot();
    fs.writeFileSync(path.join(OUT, "comparison-doodly-table-390.png"), buf);
    const size = pngSize(buf);
    console.log(`shot comparison-doodly-table-390: png=${size.width}x${size.height}`);
  }
  await context.close();
}

// 4) Overflow audit across all routes and widths.
for (const width of AUDIT_WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const route of ALL_ROUTES) {
    await gotoRetry(page, BASE + route, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.addStyleTag({ content: HIDE_DEV_OVERLAY }).catch(() => {});
    const d = await diag(page, width);
    const overflow = d.overflowX > 1;
    results.overflow.push({ route, width, overflowX: d.overflowX, overflow });
    if (overflow) console.log(`OVERFLOW ${route} @ ${width}px -> ${d.overflowX}px`);
  }
  await context.close();
}

await browser.close();

fs.writeFileSync(path.join(OUT, "viewport-diagnostics.json"), JSON.stringify(results, null, 2));
const anyOverflow = results.overflow.filter((o) => o.overflow);
console.log(`\nDONE. shots=${results.shots.length}, overflow issues=${anyOverflow.length}`);
