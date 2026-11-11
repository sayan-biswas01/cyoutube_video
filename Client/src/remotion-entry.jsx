import { registerRoot, Composition } from "remotion";
import { Cinematic3DChart } from "./components/Cinematic3DChart.jsx";
import "./index.css";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Cinematic3DChart"
      component={Cinematic3DChart}
      durationInFrames={450} // ১৫ সেকেন্ড ভিডিও
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        title: "Test Video",
        themeColor: "#00ffcc",
        voiceoverFile: null,
        dataPoints: [{ label: "Demo", value: 100 }],
      }}
    />
  );
};

registerRoot(RemotionRoot);
