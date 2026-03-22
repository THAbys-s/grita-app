import { Text, View } from "react-native";
import { usePodometro } from "../hooks/usePodometro";

export default function App() {
  const { estaCaminando, pasos } = usePodometro();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>
        {estaCaminando ? "Caminando 🚶" : "Quieto 🛑"}
      </Text>
      <Text style={{ fontSize: 18, marginTop: 12 }}>Pasos: {pasos}</Text>
    </View>
  );
}
