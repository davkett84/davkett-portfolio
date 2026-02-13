"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  lowSrc: string;
  highSrc: string;
  poster?: string;
  className?: string;
};

export default function VideoPreview({ lowSrc, highSrc, poster, className }: Props) {
  const lowRef = useRef<HTMLVideoElement | null>(null);
  const highRef = useRef<HTMLVideoElement | null>(null);
  const [showHigh, setShowHigh] = useState(false);

  useEffect(() => {
    const high = highRef.current;
    if (!high) return;

    const onReady = () => setShowHigh(true);
    high.addEventListener("canplay", onReady, { once: true });

    return () => high.removeEventListener("canplay", onReady);
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <video
        ref={lowRef}
        src={lowSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.01)",
          filter: "blur(6px)",
        }}
      />

      <video
        ref={highRef}
        src={highSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.01)",
          opacity: showHigh ? 1 : 0,
          transition: "opacity 260ms ease",
        }}
      />
    </div>
  );
}
