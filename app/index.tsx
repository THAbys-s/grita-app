// app/caminata.tsx
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useMovimiento } from "../hooks/useAcelerometro";

export default function Caminata() {
  const { estaCaminando } = useMovimiento();

  const player = useVideoPlayer(
    require("../assets/videos/undertale.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
    },
  );

  useEffect(() => {
    if (estaCaminando) {
      player.play();
    } else {
      player.pause();
    }
  }, [estaCaminando]);

  return (
    <View style={{ flex: 1 }}>
      {/* fondo — video */}
      <VideoView
        player={player}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        contentFit="cover"
        nativeControls={false}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          position: "absolute",
          top: 60,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 24, color: "white" }}>
          {estaCaminando ? "Caminando 🚶" : "Quieto 🛑"}
        </Text>
        <Text style={{ fontSize: 18, marginTop: 15, color: "white" }}>
          Movimiento: {movimientoAcumulado}
        </Text>
      </View>
    </View>
  );
}
