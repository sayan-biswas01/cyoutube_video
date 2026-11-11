const path = require('path');
const fs = require('fs');
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");

async function renderCinematicVideo(videoProps) {
    console.log("🎬 Bundling Client React App for Cloud Factory...");
    
    const entryFile = path.join(__dirname, "../Client/src/remotion-entry.jsx");
    const bundledUrl = await bundle(entryFile);

    // ক্লাউড সার্ভারের জন্য ক্রোম ব্রাউজার সেটিংস (যাতে হ্যাং না করে)
    const chromiumOptions = {
        gl: "angle",
        enableMultiProcessOnLinux: true,
    };

    const composition = await selectComposition({
        serveUrl: bundledUrl,
        id: "Cinematic3DChart", 
        inputProps: videoProps,
        chromiumOptions,
    });

    const outputDir = path.join(__dirname, 'outputs');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputLocation = outputDir + `/${videoProps.topicId}.mp4`;
    
    console.log(`⚙️ Rendering FULL HD 1080p Video on Cloud...`);
    await renderMedia({
        composition,
        serveUrl: bundledUrl,
        codec: "h264",
        outputLocation,
        inputProps: videoProps, 
        chromiumOptions,
        concurrency: 2,           // গিটহাবের জন্য পারফেক্ট স্পিড
        imageFormat: "jpeg",      // দ্রুত রেন্ডারের জন্য
        jpegQuality: 90,
        timeoutInMilliseconds: 180000 // ৩ মিনিট টাইমআউট (এর মধ্যে শেষ না হলে অটো বন্ধ হবে)
    });

    console.log(`🎉 Cloud Render Complete! Saved at: ${outputLocation}`);
    return outputLocation;
}

module.exports = { renderCinematicVideo };
