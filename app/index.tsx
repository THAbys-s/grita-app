import { Image, Text, View } from "react-native";
import useAcelerometro from "../hooks/useAcelerometro";

const fondo = require("../assets/background/background_echo_flower.jpg");

export default function App() {
  const { estaCaminando, pasos } = useAcelerometro();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={fondo}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24, color: "black" }}>
          {estaCaminando ? "Caminando 🚶" : "Quieto 🛑"}
        </Text>

        <Text style={{ fontSize: 18, marginTop: 12, color: "black" }}>
          Pasos: {pasos}
        </Text>
      </View>
    </View>
  );
}
