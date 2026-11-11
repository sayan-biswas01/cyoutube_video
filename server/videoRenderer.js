const path = require("path");
const fs = require("fs");
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");

async function renderCinematicVideo(videoProps) {
  console.log("🎬 Bundling Client React App...");

  const entryFile = path.join(__dirname, "../Client/src/remotion-entry.jsx");
  const bundledUrl = await bundle(entryFile);

  const composition = await selectComposition({
    serveUrl: bundledUrl,
    id: "Cinematic3DChart",
    inputProps: videoProps,
  });

  const outputDir = path.join(__dirname, "outputs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputLocation = path.join(outputDir, `${videoProps.topicId}.mp4`);

  console.log(`⚙️ Rendering FULL HD 1080p Video...`);
  await renderMedia({
    composition,
    serveUrl: bundledUrl,
    codec: "h264",
    outputLocation,

    // ফিক্স ১: এই লাইনটি না থাকায় আগের ভিডিওতে ডেটা ও ভয়েস যায়নি!
    inputProps: videoProps,

    // ফিক্স ২: HD কোয়ালিটির জন্য সেটিং
    imageFormat: "png", // অরিজিনাল কোয়ালিটি
    videoBitrate: "15000k", // ইউটিউব 1080p স্ট্যান্ডার্ড বিটরেট
  });

  return outputLocation;
}

module.exports = { renderCinematicVideo };
