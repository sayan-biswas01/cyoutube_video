// const cron = require("node-cron");
// const { fetchDailyTopic } = require("./dataFetcher");
// const { renderCinematicVideo } = require("./videoRenderer");

// console.log("🤖 Auto-Video Agent Started...");

// // প্রতিদিন বিকেল ৩টায় রান করবে
// cron.schedule("0 15 * * *", async () => {
//   console.log(`\n🚀 Starting Daily Mission...`);
//   try {
//     const videoData = await fetchDailyTopic("world_data");
//     console.log(`✅ Data & Voice ready: ${videoData.title}`);

//     const finalVideoPath = await renderCinematicVideo(videoData);
//     console.log(`🎉 Video saved at: ${finalVideoPath}`);
//   } catch (error) {
//     console.error(`❌ Error:`, error);
//   }
// });

// // ... (ওপরের ক্রন জবের কোড ঠিক থাকবে)

// // নিচের এই অংশটুকুর কমেন্ট (//) মুছে দিন:
// (async () => {
//   console.log("🛠️ Running Test Build right now...");
//   const props = await fetchDailyTopic("test");
//   await renderCinematicVideo(props);
// })();
//
//
const { fetchDailyTopic } = require("./dataFetcher");
const { renderCinematicVideo } = require("./videoRenderer");

(async () => {
  console.log("🚀 GitHub Render Engine Started...");
  try {
    // চ্যানেলের নিশ বা নাম ডাইনামিকভাবে নেওয়া হবে (না থাকলে ডিফল্ট 'world_data')
    const niche = process.env.CHANNEL_NICHE || "world_data";

    console.log(`🔍 Preparing Data & Voice for Niche: ${niche}...`);
    const videoData = await fetchDailyTopic(niche);
    console.log(`✅ Ready: ${videoData.title}`);

    console.log(`🎬 Rendering Full HD Video...`);
    const finalVideoPath = await renderCinematicVideo(videoData);
    console.log(`🎉 SUCCESS! Video saved at: ${finalVideoPath}`);

    process.exit(0); // কাজ শেষ হলে সার্ভার অটোমেটিক বন্ধ হয়ে যাবে
  } catch (error) {
    console.error(`❌ Render Failed:`, error);
    process.exit(1);
  }
})();
