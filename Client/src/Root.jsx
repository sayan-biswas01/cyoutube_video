import { Composition } from "remotion";
import HistoryMap from "./components/HistoryMap.jsx";
import "./index.css";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AnimatedHistoryMap"
        component={HistoryMap}
        durationInFrames={300} // ১০ সেকেন্ড (30fps * 10)
        fps={30}
        width={1080}
        height={1920} // Shorts/Reels সাইজ
        defaultProps={{
          startYear: 1900,
          endYear: 2026,
        }}
      />
    </>
  );
};
