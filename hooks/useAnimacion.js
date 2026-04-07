import { useEffect, useRef, useState } from "react";

const frames = [
  require("../assets/sprites/frame_1.png"),
  require("../assets/sprites/frame_2.png"),
  require("../assets/sprites/frame_3.png"),
];

const idle = require("../assets/sprites/frame_0.png");

export default function useAnimacion(estaCaminando) {
  const [frame, setFrame] = useState(0);
  const intervaloRef = useRef(null);

  useEffect(() => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }

    if (estaCaminando) {
      intervaloRef.current = setInterval(() => {
        setFrame((prev) => (prev + 1) % frames.length);
      }, 120);
    } else {
      setFrame(0);
    }

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, [estaCaminando]);

  return estaCaminando ? frames[frame] : idle;
}
