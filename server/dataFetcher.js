const axios = require("axios");
const googleTTS = require("google-tts-api");
const path = require("path");
const fs = require("fs");

const THEMES = ["#00ffcc", "#ff007f", "#ffea00", "#0088ff"];

async function fetchDailyTopic(niche) {
  const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
  const today = new Date().toISOString().split("T")[0];

  let sortedData = [];

  try {
    console.log("🔍 Fetching data from API...");
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,population",
    );
    if (Array.isArray(res.data)) {
      sortedData = res.data
        .sort((a, b) => b.population - a.population)
        .slice(0, 10);
    } else {
      throw new Error("API Error");
    }
  } catch (error) {
    console.log("⚠️ API Error! Using fallback backup data...");
    // ফিক্স: ১০টি দেশের সম্পূর্ণ ডেটা লিস্ট
    sortedData = [
      { name: { common: "India" }, population: 1428000000 },
      { name: { common: "China" }, population: 1411000000 },
      { name: { common: "USA" }, population: 333000000 },
      { name: { common: "Indonesia" }, population: 275000000 },
      { name: { common: "Pakistan" }, population: 235000000 },
      { name: { common: "Nigeria" }, population: 218000000 },
      { name: { common: "Brazil" }, population: 215000000 },
      { name: { common: "Bangladesh" }, population: 171000000 },
      { name: { common: "Russia" }, population: 144000000 },
      { name: { common: "Mexico" }, population: 127000000 },
    ];
  }

  const title = `Top 10 Populated Countries (${new Date().getFullYear()})`;
  const script =
    "Welcome to World Data. Here are the top 10 most populated countries in the world.";

  const voiceFileName = `voice_${Date.now()}.mp3`;
  const audioDir = path.join(__dirname, `../Client/public/audio`);
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
  const audioPath = path.join(audioDir, voiceFileName);

  let finalVoicePath = null;

  try {
    console.log("🎙️ Generating AI Voiceover...");
    const url = googleTTS.getAudioUrl(script, {
      lang: "en-US",
      slow: false,
      host: "https://translate.google.com",
    });
    const response = await axios({
      url,
      method: "GET",
      responseType: "arraybuffer",
    });

    fs.writeFileSync(audioPath, response.data);
    finalVoicePath = `audio/${voiceFileName}`;
    console.log("✅ Voiceover saved perfectly!");
  } catch (err) {
    console.error("❌ Voiceover Error.", err.message);
    finalVoicePath = null;
  }

  return {
    topicId: `global_${Date.now()}`,
    title: title,
    voiceoverFile: finalVoicePath,
    themeColor: randomTheme,
    dataPoints: sortedData.map((d) => ({
      label: d.name.common,
      value: d.population,
    })),
  };
}

module.exports = { fetchDailyTopic };
