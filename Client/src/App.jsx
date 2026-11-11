import React from "react";
import { Player } from "@remotion/player";
import { Cinematic3DChart } from "./components/Cinematic3DChart.jsx";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#050505",
        margin: 0,
      }}
    >
      <Player
        component={Cinematic3DChart}
        inputProps={{
          title: "Preview Environment",
          themeColor: "#00ffcc",
          voiceoverFile: null,
          dataPoints: [
            { label: "Bangladesh", value: 170000000 },
            { label: "Brazil", value: 214000000 },
            { label: "USA", value: 331000000 },
          ],
        }}
        durationInFrames={450}
        fps={30}
        compositionWidth={1080}
        compositionHeight={1920}
        controls
        autoPlay
        loop
        style={{
          height: "90vh",
          aspectRatio: "1080/1920",
          borderRadius: "15px",
        }}
      />
    </div>
  );
}
