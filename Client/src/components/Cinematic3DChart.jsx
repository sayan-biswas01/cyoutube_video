import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Audio,
  staticFile,
  AbsoluteFill,
} from "remotion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Text, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
// ৩ডি পিলারের অ্যানিমেশন
const DataPillar = ({ label, value, index, maxValue, themeColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heightRatio = value / maxValue;
  const targetHeight = Math.max(heightRatio * 18, 2); // পিলারগুলো আরও লম্বা ও আকর্ষণীয় করা হলো
  const currentHeight = interpolate(
    frame - index * 15, // দ্রুত উঠবে
    [0, fps],
    [0.1, targetHeight],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  // শর্টসের জন্য এক্স-অক্ষ বরাবর পিলারগুলো সাজানো (৩ গ্যাপ দিয়ে)
  const xPosition = index * 3.5 - 10;
  return (
    <group position={[xPosition, currentHeight / 2 - 10, 0]}>
      <mesh>
        <boxGeometry args={[1.5, currentHeight, 1.5]} />
        <meshStandardMaterial
          color={themeColor}
          emissive={themeColor}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <Float speed={2} floatIntensity={0.2}>
        {/* দেশের নাম (স্পষ্ট দেখার জন্য Outline দেওয়া হলো) */}
        <Text
          position={[0, currentHeight / 2 + 1.5, 0]}
          fontSize={1.2}
          color="white"
          outlineWidth={0.05}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
        {/* জনসংখ্যা */}
        <Text
          position={[0, currentHeight / 2 + 0.3, 0]}
          fontSize={0.8}
          color={themeColor}
          outlineWidth={0.05}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
        >
          {(value / 1000000).toFixed(1)}M
        </Text>
      </Float>
    </group>
  );
};
// ড্রোন স্টাইল সিনেমাটিক ক্যামেরা
const CameraController = () => {
  const frame = useCurrentFrame();
  useFrame(({ camera }) => {
    // ক্যামেরা বাম থেকে ডান দিকে উড়ে যাবে (Pan)
    camera.position.x = interpolate(frame, [0, 450], [-8, 22]);
    camera.position.y = 2;
    camera.position.z = 20; // শর্টসের জন্য পারফেক্ট জুম
    // ক্যামেরা সবসময় একটু সামনের দিকে তাকিয়ে থাকবে
    camera.lookAt(camera.position.x + 2, 0, 0);
  });
  return null;
};
export const Cinematic3DChart = ({
  title,
  dataPoints,
  themeColor,
  voiceoverFile,
}) => {
  const maxValue = Math.max(...dataPoints.map((d) => d.value));
  return (
    <AbsoluteFill style={{ backgroundColor: "#020202" }}>
      {voiceoverFile && (
        <Sequence from={0}>
          <Audio src={staticFile(voiceoverFile)} volume={1.0} />
        </Sequence>
      )}
      <Canvas
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <CameraController />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 15, 10]} intensity={2} />
        <Stars
          radius={150}
          depth={50}
          count={5000}
          factor={6}
          saturation={0}
          fade
          speed={1.5}
        />
        {dataPoints.map((data, index) => (
          <DataPillar
            key={index}
            index={index}
            label={data.label}
            value={data.value}
            maxValue={maxValue}
            themeColor={themeColor}
          />
        ))}

        {/* ফিক্স: রং ছড়িয়ে যাওয়া বন্ধ করে প্রফেশনাল নিয়ন গ্লো দেওয়া হলো */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            intensity={1.5}
          />
        </EffectComposer>
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "150px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "60px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            padding: "40px 50px",
            borderRadius: "30px",
            border: `3px solid ${themeColor}`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.5)`,
            textTransform: "uppercase",
            textAlign: "center",
            width: "85%",
          }}
        >
          {title}
        </h1>
      </div>
    </AbsoluteFill>
  );
};
